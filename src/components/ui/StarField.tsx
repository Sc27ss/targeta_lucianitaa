import React, { useEffect, useRef } from 'react';
export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    const stars: {
      x: number;
      y: number;
      z: number;
      size: number;
    }[] = [];
    const numStars = 200;
    const speed = 0.5;
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        size: Math.random() * 2
      });
    }
    let animationFrameId: number;
    const render = () => {
      // Clear with a slight fade for trail effect (optional, but clean clear looks better for stars)
      ctx.fillStyle = '#050510'; // Deep space color
      ctx.fillRect(0, 0, width, height);
      // Draw Nebula Gradient
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        width
      );
      gradient.addColorStop(0, 'rgba(188, 19, 254, 0.1)'); // Violet center
      gradient.addColorStop(0.5, 'rgba(0, 243, 255, 0.05)'); // Cyan mid
      gradient.addColorStop(1, 'rgba(5, 5, 16, 0)'); // Transparent edge
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#ffffff';
      stars.forEach((star) => {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
        }
        const x = star.x / star.z * width + width / 2;
        const y = star.y / star.z * height + height / 2;
        const size = Math.max(0.1, (1 - star.z / width) * star.size * 2);
        if (x >= 0 && x < width && y >= 0 && y < height) {
          const alpha = 1 - star.z / width;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        width: '100%',
        height: '100%'
      }} />);


}