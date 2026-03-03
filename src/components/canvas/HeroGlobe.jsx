import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useVideoTexture, Float } from '@react-three/drei';
import * as THREE from 'three';

// Using optimised WebM for Vercel/CDN compatibility and faster streaming
import bgVideo from '../../assets/bg-2.webm';

function VideoBackground({ seekTo = 0 }) {
    const texture = useVideoTexture(bgVideo, {
        muted: true,
        loop: true,
        start: true,
        crossOrigin: 'Anonymous',
        preload: 'auto',
    });

    const videoObj = texture.image;
    // Seek to `seekTo` on return visits (skips the cinematic opening)
    // Run this ONLY once when videoObj becomes available to prevent jitter
    useEffect(() => {
        if (!videoObj || seekTo === 0) return;

        const seek = () => { videoObj.currentTime = seekTo; };

        if (videoObj.readyState >= 1) {
            seek();
        } else {
            videoObj.addEventListener('loadedmetadata', seek, { once: true });
        }
    }, [videoObj, seekTo]);

    const aspect = (videoObj?.videoWidth && videoObj?.videoHeight)
        ? videoObj.videoWidth / videoObj.videoHeight
        : 16 / 9;

    const height = 11;
    const width = height * aspect;

    const matRef = useRef();
    useFrame(({ clock }) => {
        if (matRef.current) {
            matRef.current.opacity = 0.6 + Math.sin(clock.elapsedTime * 2) * 0.1;
        }
    });

    return (
        <mesh position={[0, 0, -2]}>
            <planeGeometry args={[width, height]} />
            <meshBasicMaterial
                ref={matRef}
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
            </Canvas>
        </div>
    );
}
