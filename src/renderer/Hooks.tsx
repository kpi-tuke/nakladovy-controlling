import {useEffect, useState} from "react";

export const useMatchPrint = () => {
  const [matches, setMatches] = useState(
    window.matchMedia("print").matches
  )

  useEffect(() => {
    window
      .matchMedia("print")
      .addEventListener('change', e => setMatches( e.matches ));
  }, []);

  return matches
}
