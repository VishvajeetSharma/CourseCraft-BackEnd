import { mastercourse } from "../../entities/mastercourse";
import { masterplan } from "../../entities/masterplan";
import { users } from "../../entities/user";
import { createResponse } from "../../helpers/createResponse";
import { uploadFile } from "../../helpers/fileUpload";
import { asyncHandler } from "../../helpers/asyncHandler";

// Master Plans
export const createmasterplan = asyncHandler(async (req, res) => {
  const { name, desc, credit, price, offer, duration, is_rec, status } = req.body;
  const isExist = await masterplan.findOne({ where: { name } });
  if (isExist) return createResponse(res, false, 400, "Plan already exists", [], true);

  const result = await masterplan.save({ name, desc, credit, price, offer, duration, is_rec, status });
  return createResponse(res, true, 200, "Plan created successfully", result, false);
});

export const getmasterplan = asyncHandler(async (_req, res) => {
  const result = await masterplan.find({ order: { created_at: "DESC" } });
  return createResponse(res, true, 200, "Plans fetched successfully", result, false);
});

export const getmasterplanbyid = asyncHandler(async (req, res) => {
  const result = await masterplan.findOne({ where: { id: req.params.id } });
  if (!result) return createResponse(res, false, 404, "Plan not found", [], true);
  return createResponse(res, true, 200, "Plan fetched successfully", result, false);
});

export const updatemasterplan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await masterplan.findOne({ where: { id } });
  if (!result) return createResponse(res, false, 404, "Plan not found", [], true);

  const { name, desc, credit, price, offer, duration, is_rec, status } = req.body;
  await masterplan.update({ id }, { name, desc, credit, price, offer, duration, is_rec, status });
  const updatedResult = await masterplan.findOne({ where: { id } });
  return createResponse(res, true, 200, "Plan updated successfully", updatedResult, false);
});

export const deletemasterplan = asyncHandler(async (req, res) => {
  const result = await masterplan.findOne({ where: { id: req.params.id } });
  if (!result) return createResponse(res, false, 404, "Plan not found", [], true);

  await masterplan.delete({ id: req.params.id });
  return createResponse(res, true, 200, "Plan deleted successfully", result, false);
});

// Master Course
export const createmastercourse = asyncHandler(async (req, res) => {
  const { title, desc, level, rating, duration, type, status } = req.body;

  if (!req.files?.thumbnail || !req.files?.content) {
    return createResponse(res, false, 400, "Thumbnail and Content required", [], true);
  }

  const isExist = await mastercourse.findOne({ where: { title } });
  if (isExist) return createResponse(res, false, 400, "Course already exists", [], true);

  const [thumbName, contentName] = await Promise.all([
    uploadFile(req.files.thumbnail, "uploads"),
    uploadFile(req.files.content, "uploads"),
  ]);

  const result = await mastercourse.save({ title, desc, level, rating, duration, type, status, thumbnail: thumbName, content: contentName });
  return createResponse(res, true, 200, "Course created successfully", result, false);
});

export const getmastercourse = asyncHandler(async (_req, res) => {
  const result = await mastercourse.find({ order: { created_at: "DESC" } });
  return createResponse(res, true, 200, "Courses fetched successfully", result, false);
});

export const getmastercoursebyid = asyncHandler(async (req, res) => {
  const result = await mastercourse.findOne({ where: { id: req.params.id } });
  if (!result) return createResponse(res, false, 404, "Course not found", [], true);
  return createResponse(res, true, 200, "Course fetched successfully", result, false);
});

export const updatemastercourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await mastercourse.findOne({ where: { id } });
  if (!result) return createResponse(res, false, 404, "Course not found", [], true);

  const { title, desc, level, rating, duration, type, status } = req.body;

  const [thumbnailName, contentName] = await Promise.all([
    req.files?.thumbnail ? uploadFile(req.files.thumbnail, "uploads") : Promise.resolve(result.thumbnail),
    req.files?.content ? uploadFile(req.files.content, "uploads") : Promise.resolve(result.content),
  ]);

  await mastercourse.update({ id }, { title, desc, level, rating, duration, type, status, thumbnail: thumbnailName, content: contentName });
  const updatedResult = await mastercourse.findOne({ where: { id } });
  return createResponse(res, true, 200, "Course updated successfully", updatedResult, false);
});

export const deletemastercourse = asyncHandler(async (req, res) => {
  const result = await mastercourse.findOne({ where: { id: req.params.id } });
  if (!result) return createResponse(res, false, 404, "Course not found", [], true);

  await mastercourse.delete({ id: req.params.id });
  return createResponse(res, true, 200, "Course deleted successfully", result, false);
});

// Users
export const getUsers = asyncHandler(async (_req, res) => {
  const result = await users.find({ order: { created_at: "DESC" } });
  return createResponse(res, true, 200, "Users fetched successfully", result, false);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const result = await users.findOne({ where: { id: req.params.id } });
  if (!result) return createResponse(res, false, 404, "User not found", [], true);

  await users.delete({ id: req.params.id });
  return createResponse(res, true, 200, "User deleted successfully", result, false);
});

export const getDashboardStats = asyncHandler(async (_req, res) => {
  const [totalUsers, activeUsers, totalPlans, activePlans, totalCourses, activeCourses] = await Promise.all([
    users.count(),
    users.count({ where: { status: 1 } }),
    masterplan.count(),
    masterplan.count({ where: { status: 1 } }),
    mastercourse.count(),
    mastercourse.count({ where: { status: 1 } }),
  ]);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const graphData = months.map((month) => ({
    name: month,
    users: Math.floor(Math.random() * 100),
    courses: Math.floor(Math.random() * 20),
  }));

  return createResponse(res, true, 200, "Dashboard stats fetched successfully", {
    users: { total: totalUsers, active: activeUsers },
    plans: { total: totalPlans, active: activePlans },
    courses: { total: totalCourses, active: activeCourses },
    graphData,
  }, false);
});
