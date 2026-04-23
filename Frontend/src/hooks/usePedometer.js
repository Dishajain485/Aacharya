// Pedometer Hook - ACTUAL DEVICE SENSORS
import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const usePedometer = () => {
  const { state, dispatch } = useApp();
  const [isTracking, setIsTracking] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(0); // km/h
  const [error, setError] = useState(null);

  useEffect(() => {
    let lastX = 0, lastY = 0, lastZ = 0;
    let threshold = 12; // Adjusted threshold for step detection
    let stepDelay = 250; // Minimum ms between steps
    let lastStepTime = 0;
    
    let lastLat = null;
    let lastLon = null;
    let lastLocationTime = null;
    let geoId = null;

    const handleMotion = (event) => {
      if (!isTracking) return;
      
      const acc = event.accelerationIncludingGravity;
      if (!acc) return;

      const deltaX = Math.abs(acc.x - lastX);
      const deltaY = Math.abs(acc.y - lastY);
      const deltaZ = Math.abs(acc.z - lastZ);

      // Basic step detection logic
      if ((deltaX > threshold && deltaY > threshold) || 
          (deltaX > threshold && deltaZ > threshold) || 
          (deltaY > threshold && deltaZ > threshold)) {
        
        const now = Date.now();
        if (now - lastStepTime > stepDelay) {
          lastStepTime = now;
          
          // Dispatch step to global state (increment by 1)
          dispatch({ 
            type: 'LOG_STEPS', 
            payload: { steps: 1, speed: currentSpeed } 
          });
        }
      }

      lastX = acc.x;
      lastY = acc.y;
      lastZ = acc.z;
    };

    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Radius of the earth in km
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2); 
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
      return R * c; // Distance in km
    };

    if (isTracking) {
      // 1. Setup Accelerometer for Steps
      if (typeof window.DeviceMotionEvent !== 'undefined') {
        // Request permission for iOS 13+
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
          DeviceMotionEvent.requestPermission()
            .then(permissionState => {
              if (permissionState === 'granted') {
                window.addEventListener('devicemotion', handleMotion);
              } else {
                setError('Motion sensor permission denied');
              }
            })
            .catch(console.error);
        } else {
          window.addEventListener('devicemotion', handleMotion);
        }
      } else {
        setError('Device motion not supported on this device/browser');
      }

      // 2. Setup Geolocation for Speed
      if ('geolocation' in navigator) {
        geoId = navigator.geolocation.watchPosition(
          (position) => {
            if (position.coords.speed !== null) {
              // Browser directly provides speed in m/s, convert to km/h
              const speedKmh = position.coords.speed * 3.6;
              setCurrentSpeed(parseFloat(speedKmh.toFixed(1)));
            } else {
              // Calculate speed manually
              const { latitude, longitude } = position.coords;
              const now = Date.now();
              
              if (lastLat !== null && lastLon !== null && lastLocationTime !== null) {
                const distKm = getDistanceFromLatLonInKm(lastLat, lastLon, latitude, longitude);
                const timeHours = (now - lastLocationTime) / (1000 * 60 * 60);
                if (timeHours > 0) {
                  const calculatedSpeed = distKm / timeHours;
                  // Only update if realistic (e.g. less than 40 km/h)
                  if (calculatedSpeed < 40) {
                    setCurrentSpeed(parseFloat(calculatedSpeed.toFixed(1)));
                  }
                }
              }
              lastLat = latitude;
              lastLon = longitude;
              lastLocationTime = now;
            }
          },
          (err) => setError(err.message),
          { enableHighAccuracy: true, maximumAge: 0 }
        );
      }
    }

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
      if (geoId !== null && 'geolocation' in navigator) {
        navigator.geolocation.clearWatch(geoId);
      }
    };
  }, [isTracking, currentSpeed, dispatch]);

  const toggleTracking = () => {
    setIsTracking(!isTracking);
  };

  return {
    isTracking,
    toggleTracking,
    currentSpeed,
    error
  };
};
