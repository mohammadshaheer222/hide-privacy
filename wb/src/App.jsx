import { useState, useEffect } from "react";

function App() {
  const [showFooter, setShowFooter] = useState(false); 
  const [lastScrollY, setLastScrollY] = useState(0);   // Tracks last scroll position
  const [hasScrolledHalf, setHasScrolledHalf] = useState(false); // Tracks if user has scrolled 50%

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight - windowHeight;

      if (currentScrollY / fullHeight >= 0.5) {
        setHasScrolledHalf(true);
      } else {
        setHasScrolledHalf(false);
      }

      
      if (hasScrolledHalf) {
        if (currentScrollY > lastScrollY) {
          setShowFooter(true);
        } else {
          setShowFooter(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, hasScrolledHalf]);

  return (
    <>
      <div className="h-screen bg-yellow-500">section 1</div>
      <div className="h-screen bg-red-500">section 2</div>
      <div className="h-screen bg-blue-500">section 3</div>

      {/* Conditionally render the footer based on scroll direction and scroll percentage */}
      {showFooter && (
        <div className="bg-black w-full h-24 fixed bottom-0 left-0 right-0">
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consectetur assumenda praesentium provident distinctio. Odio id
            dolorem repellendus, harum cupiditate repudiandae.
          </p>
        </div>
      )}
    </>
  );
}

export default App;
