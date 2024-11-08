import { setUpDataBase } from "./testDb/testDb";

export const callBeforeAll = () => {
  return beforeAll(async () => {
    await setUpDataBase();
  }, 100000);
};
