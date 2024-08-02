import { useCallback } from "react";

import { generateRandomCats } from "@utils/catGenerator";
import { useAddCatMutation } from "@store/api/apiBuilder";

const CHUNK_OF_CATS = 100;

const useGenerateRandomCats = () => {
  const [addCatMutation] = useAddCatMutation();

  const handleGenerateRandomCats = useCallback(async () => {
    const randomCats = generateRandomCats(CHUNK_OF_CATS);
    await Promise.all(randomCats.map((cat) => addCatMutation(cat)));
  }, [addCatMutation]);

  return { handleGenerateRandomCats };
};

export default useGenerateRandomCats;
