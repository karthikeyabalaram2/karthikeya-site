import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useVideoTexture, Float } from '@react-three/drei';
import * as THREE from 'three';

import globeVideo from '../../assets/Globe-movement1.mp4';

// Star trails removed

function GlobePlane() {
    const texture = useTexture(globeImg);

    // Calculate aspect ratio to avoid "squeezing"
    // Default to 1 if not loaded yet (though Suspense handles this)
    const aspect = texture.image ? texture.image.width / texture.image.height : 1;
    // Globe is bigger now
    const height = 7; // Increased from 5
    const width = height * aspect;

    return (
        <mesh position={[0, 0, 0.1]}>
            <planeGeometry args={[width, height]} />
            {/* React to light to get the "shine" - roughness 0.4 for matte-ish but specular highlight */}
            <meshStandardMaterial
                map={texture}
                transparent
                opacity={1}
                toneMapped={false}
                roughness={0.4}
                metalness={0.2}
            />
        </mesh>
    );
}

function VideoBackground({ seekTo = 0 }) {
    const texture = useVideoTexture(globeVideo, {
        muted: true,
        loop: true,
        start: true,
        crossOrigin: 'Anonymous',
    });

    // Seek the video to `seekTo` seconds once the element is ready
    // This lets return visits skip the opening seconds of the clip
    const videoObj = texture.image;
    useEffect(() => {
        if (videoObj && seekTo > 0) {
            const seek = () => { videoObj.currentTime = seekTo; };
            if (videoObj.readyState >= 1) {
                seek();
            } else {
                videoObj.addEventListener('loadedmetadata', seek, { once: true });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoObj, seekTo]);

    // Dynamically calculate aspect ratio to prevent stretching
    const aspect = (videoObj && videoObj.videoWidth && videoObj.videoHeight)
        ? videoObj.videoWidth / videoObj.videoHeight
        : 16 / 9;

    const height = 11;
    const width = height * aspect;

    const pulseRef = useRef();
    useFrame(({ clock }) => {
        if (pulseRef.current) {
            pulseRef.current.opacity = 0.6 + Math.sin(clock.elapsedTime * 2) * 0.1;
        }
    });

    return (
        <mesh position={[0, 0, -2]}>
            <planeGeometry args={[width, height]} />
            <meshBasicMaterial
                ref={pulseRef}
                map={texture}
                transparent={false}
                opacity={1}
                toneMapped={false}
                blending={THREE.NormalBlending}
            />
        </mesh>
    );
}

export default function HeroGlobe({ seekTo = 0 }) {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true }}>
                <fog attach="fog" args={['#02040A', 5, 20]} />
                <ambientLight intensity={1.5} />
                <spotLight position={[5, 5, 5]} angle={0.5} penumbra={1} intensity={20} color="#ffffff" />
                <React.Suspense fallback={null}>
                    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
                        <VideoBackground seekTo={seekTo} />
                    </Float>
                </React.Suspense>

                {/* Space reserved for new section/animation per user request */}
            </Canvas>
        </div>
    );
}
