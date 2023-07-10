import React, { createContext,  useState } from 'react';

export const VolumeContext = createContext();

export const VolumeProvider = ({ children }) => {
    const [volume, setVolume] = useState(1);
    const [preVolume, setPreVolume] = useState(1);

    return (
        <VolumeContext.Provider value={{ volume, setVolume, preVolume, setPreVolume }}>
            {children}
        </VolumeContext.Provider>
    );
};
