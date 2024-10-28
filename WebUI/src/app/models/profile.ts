import { Certificate } from "./certificate";
import { Skill } from "./skill";

export interface Profile {
  name: string;
  phone: string;
  email: string;
  age: number;
  address: string;
  skills: Skill[];
  certificates: Certificate[];
}
