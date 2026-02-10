<script>
  import { onMount } from "svelte";

  let canvas;
  let ctx;
  let animationId;
  let particles = [];
  let palette = ["#98f05a", "#2e8f58", "#b02b2b"];
  let mouse = { x: 0, y: 0, active: false };
  const particleCount = 236;

  const createParticle = (width, height) => {
    const speed = 0.2 + Math.random() * 0.6;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      baseRadius: 1 + Math.random() * 2.5,
      radius: 1 + Math.random() * 2.5,
      alpha: 0.2 + Math.random() * 0.6,
      color: palette[Math.floor(Math.random() * palette.length)],
    };
  };

  const resize = () => {
    if (!canvas) return;
    const { innerWidth, innerHeight } = window;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    particles = Array.from({ length: particleCount }, () => createParticle(innerWidth, innerHeight));
  };

  const step = () => {
    if (!ctx || !canvas) return;
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    for (const particle of particles) {
      const dx = particle.x - mouse.x;
      const dy = particle.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influenceRadius = 140;
      const proximity = mouse.active ? Math.max(0, 1 - dist / influenceRadius) : 0;
      const targetRadius = particle.baseRadius * (1 + proximity * 2.4);

      particle.radius += (targetRadius - particle.radius) * 0.12;

      if (proximity === 0) {
        particle.x += particle.vx;
        particle.y += particle.vy;
      }

      if (particle.x < -20 || particle.x > width + 20) particle.vx *= -1;
      if (particle.y < -20 || particle.y > height + 20) particle.vy *= -1;

      ctx.beginPath();
      ctx.fillStyle = `${particle.color}${Math.floor(particle.alpha * 255)
        .toString(16)
        .padStart(2, "0")}`;
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const intensity = 0.08 * (1 - dist / 120);
          ctx.strokeStyle = `rgba(152, 240, 90, ${intensity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(step);
  };

  onMount(() => {
    ctx = canvas.getContext("2d");
    const styles = getComputedStyle(document.documentElement);
    const lime = styles.getPropertyValue("--creature-lime").trim();
    const emerald = styles.getPropertyValue("--creature-emerald").trim();
    const blood = styles.getPropertyValue("--creature-blood").trim();
    palette = [lime || palette[0], emerald || palette[1], blood || palette[2]];
    resize();
    const handleMove = (event) => {
      mouse = { x: event.clientX, y: event.clientY, active: true };
    };
    const handleLeave = () => {
      mouse = { x: 0, y: 0, active: false };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    animationId = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      if (animationId) cancelAnimationFrame(animationId);
    };
  });
</script>

<canvas bind:this={canvas} class="particle-canvas"></canvas>
