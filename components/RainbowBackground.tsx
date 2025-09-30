import React, { useMemo } from 'react';

const RainbowBackground: React.FC = () => {
  const bars = useMemo(() => {
    // Darker color palette for a more subdued effect
    const purple = 'rgb(126, 34, 206)'; // Darker Purple
    const blue = 'rgb(30, 64, 175)';    // Darker Blue
    const green = 'rgb(15, 118, 110)';   // Darker Teal/Green
    const colors = [purple, blue, green];

    const shuffle = (array: string[]) => {
      let currentIndex = array.length, randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
      return array;
    };
    
    // Increased animation time for a slower, calmer effect
    const animationTime = 90;
    const length = 25;

    return Array.from({ length }).map((_, i) => {
      const shuffledColors = shuffle([...colors]);
      const style = {
        boxShadow: `
          -130px 0 80px 40px black,
          -50px 0 50px 25px ${shuffledColors[0]},
          0 0 50px 25px ${shuffledColors[1]},
          50px 0 50px 25px ${shuffledColors[2]},
          130px 0 80px 40px black
        `,
        animation: `slide ${animationTime - (animationTime / length / 2) * i}s linear infinite`,
        animationDelay: `-${(i / length) * animationTime}s`,
      };
      return <div key={i} className="absolute top-0 h-screen w-0 rotate-[10deg] origin-top-right" style={style} />;
    });
  }, []);

  return (
    <div className="fixed inset-0 -z-20 bg-black">
      {bars}
      {/* Extra glow effects */}
      <div className="absolute bottom-0 left-0 w-screen h-0 shadow-[0_0_50vh_40vh_black]" />
      <div className="absolute bottom-0 left-0 h-screen w-0 shadow-[0_0_35vw_25vw_black]" />
    </div>
  );
};

export default RainbowBackground;
