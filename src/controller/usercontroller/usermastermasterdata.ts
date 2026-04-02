import { course } from "../../entities/course";
import { mastercourse } from "../../entities/mastercourse";
import { masterplan } from "../../entities/masterplan";
import { plan } from "../../entities/plan";
import { users } from "../../entities/user";
import { createResponse } from "../../helpers/createResponse";
 

// Dashboard States

export const getUserDashboardStats = async (req: any, res: any) => {
  try {
    const user_Id = req.user.id; // assuming auth middleware se aa raha hai

    // ===== USER RECORD =====
    const userData = await users.findOne({
      where: { id: user_Id }
    });

    // ===== TOTAL PLANS =====
    const totalPlans = await masterplan.count();

    // ===== PURCHASED PLANS =====
    const purchasedPlans = await plan.count({
      where: { user_id: user_Id }
    });

    // ===== TOTAL COURSES =====
    const totalCourses = await mastercourse.count();

    // ===== USER COURSES (AGAR TRACK KARTE HO) =====
    const userCourses = await course.count({
      where: { user_id: user_Id }
    });

    // ===== REMAINING CREDIT =====
    const remainingCredit = userData?.credit || 0;

    // ===== MONTHLY TREND DATA (ADMIN STYLE) =====
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const chartData = months.map((month) => ({
      name: month,
      plans: Math.floor(Math.random() * 20),
      courses: Math.floor(Math.random() * 10),
    }));

    return createResponse(
      res,
      true,
      200,
      "User dashboard stats fetched successfully",
      {
        user: userData,
        stats: {
          totalPlans,
          purchasedPlans,
          totalCourses,
          userCourses,
          remainingCredit
        },
        chartData
      },
      false
    );

  } catch (error: any) {
    return createResponse(
      res,
      false,
      500,
      error.message || "Internal Server Error",
      [],
      true
    );
  }
};

// Plan
export const userPurchasePlan = async (req: any, res: any) => {
  try {
    const {plan_id}=req.body 
    const user_id=req.user.id 
    await  plan.save({user_id,plan_id})
    const masterplanRes = await masterplan.findOne({  where:{id:plan_id}});
    const userRes=await users.findOne({where:{id:user_id}})
    const finalCredit:any=parseInt(masterplanRes?.credit)+parseInt(userRes?.credit);
    await users.update({id:user_id},{credit:finalCredit})
    return createResponse(res, true, 200, "Plans created  successfully", finalCredit, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
  
}; 
  
export const userPurchasedPlan = async (req: any, res: any) => {
  try {
    const user_id = req.user.id;

    const data = await plan.createQueryBuilder('plan')
      .leftJoinAndSelect(masterplan, "mp", "mp.id = plan.plan_id")
      .where("plan.user_id = :user_id", { user_id })
      .getRawMany();

    return createResponse(res, true, 200, "Plans fetched successfully", data, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
};

// Master Course
export const getMasterCourse = async (req: any, res: any) => {
  try {
    const result = await mastercourse.find({ order: {created_at: "DESC", } });
    return createResponse(res, true, 200, "Courses fetched successfully", result, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
}; 

export const userViewCourse = async (req: any, res: any) => {
  try {
    const user_id = req.user.id;
   const user=await users.findOne({where:{id:user_id}});
   const remaingCredit=parseInt(user?.credit);
   if(remaingCredit>0){
    const final:any=remaingCredit-1
   await users.update({id:user_id},{credit:final})
   return createResponse(res, true, 200, "success", [], false);
   }else{
 return createResponse(res, false, 400, "You have insufficient credit please purschase", [], true);
   } 
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
};