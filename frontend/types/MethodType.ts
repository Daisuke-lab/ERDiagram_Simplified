import { CREATE, DELETE, UPDATE } from "../src/constant";


export type MethodType = typeof CREATE | typeof UPDATE | typeof DELETE

export default MethodType