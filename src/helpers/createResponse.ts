export const createResponse = (res: any, success: boolean = true, code: number = 200, message: string = "", result: any = [], error: any = false) => {
  return res.status(code).json({ success, code, message, result, error });
};