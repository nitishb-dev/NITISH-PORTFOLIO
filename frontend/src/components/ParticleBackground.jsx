import React, { useEffect, useRef } from "react";

// Define Ripple class outside the component for performance and clarity.
class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = 100;
    this.opacity = 1;
    this.speed = 3;
  }

  update() {
    this.radius += this.speed;
    this.opacity = 1 - this.radius / this.maxRadius;
    return this.radius < this.maxRadius;
  }

  // Accept canvas context as an argument to draw.
  draw(ctx) {
    if (this.opacity <= 0 || !ctx) return;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(59, 130, 246, ${this.opacity * 0.6})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, isPressed: false });
  const rippleRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];

    // Set canvas size to match the Hero section
    const resizeCanvas = () => {
      // Use viewport dimensions since Hero section is min-h-screen
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Reinitialize particles when canvas is resized
      if (particles.length > 0) {
        particles.forEach((particle) => {
          // Keep particles within new bounds
          particle.x = Math.min(particle.x, canvas.width);
          particle.y = Math.min(particle.y, canvas.height);
        });
      }
    };

    resizeCanvas();

    const handleResize = () => {
      resizeCanvas();
      // Reinitialize particles on significant size changes
      if (
        particles.length === 0 ||
        Math.abs(canvas.width - window.innerWidth) > 100
      ) {
        initializeParticles();
      }
    };

    window.addEventListener("resize", handleResize);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Consistent velocity for smooth movement
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.8;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.radius = Math.random() * 2 + 1;
        this.baseRadius = this.radius;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.baseOpacity = this.opacity;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.isHovered = false;
        this.hoverScale = 1;
        this.targetScale = 1;
        // Add base velocity to maintain constant movement
        this.baseVx = this.vx;
        this.baseVy = this.vy;
        this.redistributionTimer = Math.random() * 1000; // Random timer for redistribution
      }

      update() {
        // Mouse interaction
        const mouse = mouseRef.current;
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Mouse interaction effects
        if (distance < 100) {
          this.isHovered = distance < 50;
          this.targetScale = this.isHovered ? 2 : 1.2;
          this.opacity = Math.min(
            this.baseOpacity * (this.isHovered ? 2 : 1.5),
            1
          );

          // Enhanced mouse interaction forces
          let force, attractionRadius;

          if (mouse.isPressed) {
            // Repulsion when mouse is pressed
            force = -0.08;
            attractionRadius = 120;
          } else {
            // Gentle attraction when just hovering
            force = 0.03;
            attractionRadius = 80;
          }

          if (distance < attractionRadius) {
            const forceMultiplier =
              (attractionRadius - distance) / attractionRadius;
            if (distance > 0) {
              const normalizedDx = dx / distance;
              const normalizedDy = dy / distance;

              this.vx += normalizedDx * force * forceMultiplier;
              this.vy += normalizedDy * force * forceMultiplier;
            }
          }
        } else {
          this.isHovered = false;
          this.targetScale = 1;
          this.opacity = this.baseOpacity;

          // Return to base movement when not interacting with mouse
          this.vx += (this.baseVx - this.vx) * 0.01;
          this.vy += (this.baseVy - this.vy) * 0.01;
        }

        // Smooth scale transition
        this.hoverScale += (this.targetScale - this.hoverScale) * 0.1;
        this.radius = this.baseRadius * this.hoverScale;

        // Apply movement BEFORE edge checking
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges instead of bouncing to prevent clustering
        if (this.x < 0) {
          this.x = canvas.width;
        } else if (this.x > canvas.width) {
          this.x = 0;
        }

        if (this.y < 0) {
          this.y = canvas.height;
        } else if (this.y > canvas.height) {
          this.y = 0;
        }

        // Maintain consistent speed
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const targetSpeed = 0.8;

        if (speed > 0) {
          // Normalize and apply target speed
          this.vx = (this.vx / speed) * targetSpeed;
          this.vy = (this.vy / speed) * targetSpeed;
        } else {
          // If somehow stopped, give random direction
          const angle = Math.random() * Math.PI * 2;
          this.vx = Math.cos(angle) * targetSpeed;
          this.vy = Math.sin(angle) * targetSpeed;
        }

        // Update pulse phase
        this.pulsePhase += this.pulseSpeed;
      }

      draw() {
        const pulseOpacity = this.opacity + Math.sin(this.pulsePhase) * 0.2;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        // Create gradient for particle with hover effect
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius * 3
        );

        if (this.isHovered) {
          gradient.addColorStop(0, `rgba(59, 130, 246, ${pulseOpacity})`);
          gradient.addColorStop(
            0.3,
            `rgba(99, 102, 241, ${pulseOpacity * 0.8})`
          );
          gradient.addColorStop(
            0.6,
            `rgba(147, 51, 234, ${pulseOpacity * 0.4})`
          ); // Purple accent
          gradient.addColorStop(1, `rgba(59, 130, 246, 0)`);
        } else {
          gradient.addColorStop(0, `rgba(59, 130, 246, ${pulseOpacity})`);
          gradient.addColorStop(
            0.5,
            `rgba(99, 102, 241, ${pulseOpacity * 0.6})`
          );
          gradient.addColorStop(1, `rgba(59, 130, 246, 0)`);
        }

        ctx.fillStyle = gradient;
        ctx.fill();

        // Add glow effect for hovered particles
        if (this.isHovered) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${pulseOpacity * 0.1})`;
          ctx.fill();
        }
      }
    }

    // Initialize particles after canvas is properly sized
    const initializeParticles = () => {
      particles = [];
      const particleCount = Math.min(
        80,
        Math.floor((canvas.width * canvas.height) / 15000)
      );
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
      particlesRef.current = particles;
    };

    // Initialize particles
    initializeParticles();

    // Draw connections between nearby particles
    const drawConnections = () => {
      const maxDistance = 140;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            let opacity = (1 - distance / maxDistance) * 0.25;
            let lineWidth = 1;

            // Enhance connections near mouse
            const midX = (particles[i].x + particles[j].x) / 2;
            const midY = (particles[i].y + particles[j].y) / 2;
            const mouseDistance = Math.sqrt(
              (mouse.x - midX) ** 2 + (mouse.y - midY) ** 2
            );

            if (mouseDistance < 120) {
              const enhancement = (120 - mouseDistance) / 120;
              opacity *= 1 + enhancement * 2;
              lineWidth = 1 + enhancement * 2;
            }

            // Extra enhancement for hovered particles
            if (particles[i].isHovered || particles[j].isHovered) {
              opacity *= 2;
              lineWidth = 3;
            }

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);

            // Create gradient for connection line with dynamic colors
            const gradient = ctx.createLinearGradient(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y
            );

            if (particles[i].isHovered || particles[j].isHovered) {
              gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`);
              gradient.addColorStop(
                0.3,
                `rgba(99, 102, 241, ${opacity * 0.9})`
              );
              gradient.addColorStop(
                0.7,
                `rgba(147, 51, 234, ${opacity * 0.7})`
              );
              gradient.addColorStop(1, `rgba(59, 130, 246, ${opacity})`);
            } else {
              gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`);
              gradient.addColorStop(
                0.5,
                `rgba(99, 102, 241, ${opacity * 0.8})`
              );
              gradient.addColorStop(1, `rgba(59, 130, 246, ${opacity})`);
            }

            ctx.strokeStyle = gradient;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      drawConnections();

      // Update and draw ripples
      rippleRef.current = rippleRef.current.filter((ripple) => {
        const shouldKeep = ripple.update();
        if (shouldKeep) ripple.draw(ctx); // Pass context to draw method
        return shouldKeep;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Mouse interaction effects
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseDown = (e) => {
      mouseRef.current.isPressed = true;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create ripple effect
      rippleRef.current.push(new Ripple(x, y));

      // Enhanced particle interaction on click
      const particles = particlesRef.current;
      particles.forEach((particle) => {
        const dx = x - particle.x;
        const dy = y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          const pushForce = force * 4;

          if (distance > 0) {
            particle.vx -= (dx / distance) * pushForce;
            particle.vy -= (dy / distance) * pushForce;
          }

          // Add some randomness for more natural movement
          particle.vx += (Math.random() - 0.5) * 1;
          particle.vy += (Math.random() - 0.5) * 1;
        }
      });
    };

    const handleMouseUp = () => {
      mouseRef.current.isPressed = false;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      mouseRef.current.isPressed = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 cursor-crosshair w-full h-full"
      style={{
        background: "transparent",
        pointerEvents: "auto",
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default ParticleBackground;
