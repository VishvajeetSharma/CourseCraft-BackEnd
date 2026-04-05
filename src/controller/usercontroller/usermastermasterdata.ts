import { course } from "../../entities/course";
import { mastercourse } from "../../entities/mastercourse";
import { masterplan } from "../../entities/masterplan";
import { plan } from "../../entities/plan";
import { users } from "../../entities/user";
import { createResponse } from "../../helpers/createResponse";
import { asyncHandler } from "../../helpers/asyncHandler";
import { AppDataSource } from "../../dbconfig/dbconfig";

export const getUserDashboardStats = asyncHandler(async (req, res) => {
  const user_Id = req.user.id;
  const userRepository = AppDataSource.getRepository(users);
  const planRepository = AppDataSource.getRepository(plan);
  const masterplanRepository = AppDataSource.getRepository(masterplan);
  const mastercourseRepository = AppDataSource.getRepository(mastercourse);
  const courseRepository = AppDataSource.getRepository(course);

  const [userData, totalPlans, purchasedPlans, totalCourses, userCourses] = await Promise.all([
    userRepository.findOne({ where: { id: user_Id } }),
    masterplanRepository.count(),
    planRepository.count({ where: { user_id: user_Id } }),
    mastercourseRepository.count(),
    courseRepository.count({ where: { user_id: user_Id } }),
  ]);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const chartData = months.map((month) => ({
    name: month,
    plans: Math.floor(Math.random() * 20),
    courses: Math.floor(Math.random() * 10),
  }));

  return createResponse(res, true, 200, "User dashboard stats fetched successfully", {
    user: userData,
    stats: { totalPlans, purchasedPlans, totalCourses, userCourses, remainingCredit: userData?.credit || 0 },
    chartData,
  }, false);
});

export const userPurchasePlan = asyncHandler(async (req, res) => {
  const { plan_id } = req.body;
  const user_id = req.user.id;
  const planRepository = AppDataSource.getRepository(plan);
  const masterplanRepository = AppDataSource.getRepository(masterplan);
  const userRepository = AppDataSource.getRepository(users);

  await planRepository.save({ user_id, plan_id });

  const [masterplanRes, userRes] = await Promise.all([
    masterplanRepository.findOne({ where: { id: plan_id } }),
    userRepository.findOne({ where: { id: user_id } }),
  ]);

  const finalCredit = parseInt(masterplanRes?.credit) + parseInt(userRes?.credit);
  await userRepository.update({ id: user_id }, { credit: finalCredit } as any);
  return createResponse(res, true, 200, "Plan purchased successfully", { credit: finalCredit }, false);
});

export const userPurchasedPlan = asyncHandler(async (req, res) => {
  const user_id = req.user.id;
  const planRepository = AppDataSource.getRepository(plan);
  const data = await planRepository.createQueryBuilder("plan")
    .leftJoinAndSelect(masterplan, "mp", "mp.id = plan.plan_id")
    .where("plan.user_id = :user_id", { user_id })
    .getRawMany();

  return createResponse(res, true, 200, "Plans fetched successfully", data, false);
});

export const userViewCourse = asyncHandler(async (req, res) => {
  const user_id = req.user.id;
  const userRepository = AppDataSource.getRepository(users);
  const user = await userRepository.findOne({ where: { id: user_id } });
  const remainingCredit = parseInt(user?.credit);

  if (remainingCredit <= 0) {
    return createResponse(res, false, 400, "Insufficient credit, please purchase a plan", [], true);
  }

  await userRepository.update({ id: user_id }, { credit: remainingCredit - 1 } as any);
  return createResponse(res, true, 200, "Course accessed successfully", [], false);
});
