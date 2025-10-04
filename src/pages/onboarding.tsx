import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DecoTop from "@/../public/assets/images/DecoTop.svg";
import DecoBotRight from "@/../public/assets/images/DecoBotRight.svg";
import { api } from "@/lib/api";

type UserRole = "member" | "lecturer" | "admin" | "leader" | "client";

interface ProfileData {
  phone?: string;
  bio?: string;
  // Member fields
  studentId?: string;
  major?: string;
  university?: string;
  graduationYear?: number;
  // Lecturer fields
  lecturerId?: string;
  department?: string;
  specialization?: string;
  officeRoom?: string;
  // Admin fields
  employeeId?: string;
  position?: string;
  // Leader fields
  title?: string;
  responsibilities?: string[];
  // Client fields
  companyName?: string;
  companyWebsite?: string;
  industry?: string;
}

interface OnboardingSubmission {
  role: UserRole;
  profileData: ProfileData;
  verificationCode?: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [profileData, setProfileData] = useState<ProfileData>({});
  const [verificationCode, setVerificationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);

  // Check if user has already completed onboarding
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (status === "authenticated" && session?.user) {
        try {
          // Check if user already completed onboarding
          const response = await api.get("/api/v1/onboarding/status");
          
          if (response.data.onboardingCompleted) {
            console.log("✅ User already completed onboarding, redirecting to dashboard...");
            toast.info("You've already completed onboarding!");
            router.replace("/dashboard");
          } else {
            console.log("⏳ Onboarding not completed, showing onboarding form");
            setIsCheckingStatus(false);
          }
        } catch (error) {
          console.error("Error checking onboarding status:", error);
          // If there's an error (like token issue), let user proceed to see the sign out button
          setIsCheckingStatus(false);
        }
      }
    };

    if (status === "authenticated") {
      checkOnboardingStatus();
    } else if (status === "unauthenticated") {
      router.push("/requests/login");
    }
  }, [status, session, router]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/requests/login");
    }
  }, [status, router]);

  const roles = [
    {
      value: "member" as UserRole,
      title: "Member",
      description: "Student or community member",
      icon: "👨‍🎓",
    },
    {
      value: "lecturer" as UserRole,
      title: "University Lecturer",
      description: "Academic staff or instructor",
      icon: "👨‍🏫",
    },
    {
      value: "admin" as UserRole,
      title: "Admin/Staff",
      description: "Organization administrator or staff",
      icon: "👨‍💼",
    },
    {
      value: "leader" as UserRole,
      title: "Leader/Superadmin",
      description: "Organization leader or superadmin",
      icon: "👨‍💻",
    },
    {
      value: "client" as UserRole,
      title: "Client/External",
      description: "External client or partner",
      icon: "🤝",
    },
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleInputChange = (field: string, value: any) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole) {
      toast.error("Please select a role");
      return;
    }

    // Validate verification code for admin and leader roles
    if ((selectedRole === "admin" || selectedRole === "leader") && !verificationCode) {
      toast.error("Verification code is required for Admin and Leader roles");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const submissionData: OnboardingSubmission = {
        role: selectedRole,
        profileData: profileData,
      };

      // Add verification code only for admin and leader roles
      if (selectedRole === "admin" || selectedRole === "leader") {
        submissionData.verificationCode = verificationCode;
      }

      console.log("📤 Submitting onboarding data:");
      console.log("- Role:", submissionData.role);
      console.log("- Verification Code:", submissionData.verificationCode);
      console.log("- Profile Data:", submissionData.profileData);

      await api.post("/api/v1/onboarding/complete", submissionData);

      console.log("✅ Onboarding completed successfully!");
      toast.success("Onboarding completed successfully! Redirecting to dashboard...");
      
      // Redirect immediately to dashboard
      // The dashboard will check the backend for the updated onboarding status
      router.replace("/dashboard");
    } catch (error: any) {
      console.error("Onboarding error:", error);
      console.error("Error response:", error.response?.data);
      
      // Check if it's a token error
      if (error.response?.status === 403 && error.response?.data?.message === "Invalid token") {
        toast.error("Your session has expired. Please sign out and log in again.");
      } else {
        toast.error(error.response?.data?.message || "Failed to complete onboarding");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderRoleFields = () => {
    if (!selectedRole) return null;

    const commonFields = (
      <>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[16px]">Phone Number</label>
          <input
            className="w-full bg-[#F3F3F3] px-6 py-3 rounded-lg focus:outline-none"
            type="tel"
            placeholder="Enter your phone number"
            value={profileData.phone || ""}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[16px]">Bio</label>
          <textarea
            className="w-full bg-[#F3F3F3] px-6 py-3 rounded-lg focus:outline-none resize-none"
            rows={3}
            placeholder="Tell us about yourself"
            value={profileData.bio || ""}
            onChange={(e) => handleInputChange("bio", e.target.value)}
          />
        </div>
      </>
    );

    switch (selectedRole) {
      case "member":
        return (
          <>
            {commonFields}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[16px]">Student ID</label>
              <input
                className="w-full bg-[#F3F3F3] px-6 py-3 rounded-lg focus:outline-none"
                type="text"
                placeholder="Enter your student ID"
                value={profileData.studentId || ""}
                onChange={(e) => handleInputChange("studentId", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[16px]">University</label>
              <input
                className="w-full bg-[#F3F3F3] px-6 py-3 rounded-lg focus:outline-none"
                type="text"
                placeholder="Enter your university name"
                value={profileData.university || ""}
                onChange={(e) => handleInputChange("university", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[16px]">Major</label>
              <input
                className="w-full bg-[#F3F3F3] px-6 py-3 rounded-lg focus:outline-none"
                type="text"
                placeholder="Enter your major"
                value={profileData.major || ""}
                onChange={(e) => handleInputChange("major", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[16px]">Graduation Year</label>
              <input
                className="w-full bg-[#F3F3F3] px-6 py-3 rounded-lg focus:outline-none"
                type="number"
                placeholder="2025"
                value={profileData.graduationYear || ""}
                onChange={(e) => handleInputChange("graduationYear", parseInt(e.target.value))}
              />
            </div>
          </>
        );

      case "lecturer":
        return (
          <>
            {commonFields}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[16px]">Lecturer ID</label>
              <input
                className="w-full bg-[#F3F3F3] px-6 py-3 rounded-lg focus:outline-none"
                type="text"
                placeholder="Enter your lecturer ID"
                value={profileData.lecturerId || ""}
                onChange={(e) => handleInputChange("lecturerId", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[16px]">Department</label>
              <input
                className="w-full bg-[#F3F3F3] px-6 py-3 rounded-lg focus:outline-none"
                type="text"
                placeholder="Enter your department"
                value={profileData.department || ""}
                onChange={(e) => handleInputChange("department", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[16px]">Specialization</label>
              <input
                className="w-full bg-[#F3F3F3] px-6 py-3 rounded-lg focus:outline-none"
                type="text"
                placeholder="Enter your specialization"
                value={profileData.specialization || ""}
                onChange={(e) => handleInputChange("specialization", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[16px]">Office Room</label>
              <input
                className="w-full bg-[#F3F3F3] px-6 py-3 rounded-lg focus:outline-none"
                type="text"
                placeholder="Enter your office room"
                value={profileData.officeRoom || ""}
                onChange={(e) => handleInputChange("officeRoom", e.target.value)}
              />
            </div>
          </>
        );

      case "admin":
        return (
          <>
            {commonFields}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[16px]">Employee ID</label>
              <input
                className="w-full bg-[#F3F3F3] px-6 py-3 rounded-lg focus:outline-none"
                type="text"
                placeholder="Enter your employee ID"
                value={profileData.employeeId || ""}
                onChange={(e) => handleInputChange("employeeId", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[16px]">Position</label>
              <input
                className="w-full bg-[#F3F3F3] px-6 py-3 rounded-lg focus:outline-none"
                type="text"
                placeholder="Enter your position"
                value={profileData.position || ""}
                onChange={(e) => handleInputChange("position", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[16px]">Department</label>
              <input
                className="w-full bg-[#F3F3F3] px-6 py-3 rounded-lg focus:outline-none"
                type="text"
                placeholder="Enter your department"
                value={profileData.department || ""}
                onChange={(e) => handleInputChange("department", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 bg-red-50 p-4 rounded-lg border border-red-200">
              <label className="font-semibold text-[16px] text-red-700">
                Verification Code <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full bg-white px-6 py-3 rounded-lg focus:outline-none border border-red-200 focus:border-red-500"
                type="password"
                placeholder="Enter admin verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
              <p className="text-sm text-red-600">
                🔒 Admin role requires a verification code. Contact your administrator.
              </p>
            </div>
          </>
        );

      case "leader":
        return (
          <>
            {commonFields}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[16px]">Title</label>
              <input
                className="w-full bg-[#F3F3F3] px-6 py-3 rounded-lg focus:outline-none"
                type="text"
                placeholder="e.g., CEO, Director, President"
                value={profileData.title || ""}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 bg-red-50 p-4 rounded-lg border border-red-200">
              <label className="font-semibold text-[16px] text-red-700">
                Verification Code <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full bg-white px-6 py-3 rounded-lg focus:outline-none border border-red-200 focus:border-red-500"
                type="password"
                placeholder="Enter leader verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
              <p className="text-sm text-red-600">
                🔒 Leader role requires a verification code. Contact your administrator.
              </p>
            </div>
          </>
        );

      case "client":
        return (
          <>
            {commonFields}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[16px]">Company Name</label>
              <input
                className="w-full bg-[#F3F3F3] px-6 py-3 rounded-lg focus:outline-none"
                type="text"
                placeholder="Enter your company name"
                value={profileData.companyName || ""}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[16px]">Company Website</label>
              <input
                className="w-full bg-[#F3F3F3] px-6 py-3 rounded-lg focus:outline-none"
                type="url"
                placeholder="https://example.com"
                value={profileData.companyWebsite || ""}
                onChange={(e) => handleInputChange("companyWebsite", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[16px]">Position</label>
              <input
                className="w-full bg-[#F3F3F3] px-6 py-3 rounded-lg focus:outline-none"
                type="text"
                placeholder="Enter your position"
                value={profileData.position || ""}
                onChange={(e) => handleInputChange("position", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[16px]">Industry</label>
              <input
                className="w-full bg-[#F3F3F3] px-6 py-3 rounded-lg focus:outline-none"
                type="text"
                placeholder="e.g., Technology, Finance, Healthcare"
                value={profileData.industry || ""}
                onChange={(e) => handleInputChange("industry", e.target.value)}
              />
            </div>
          </>
        );

      default:
        return commonFields;
    }
  };

  if (status === "loading" || isCheckingStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-xl font-semibold text-dark-1 mb-2">
            {status === "loading" ? "Loading..." : "Checking your onboarding status..."}
          </div>
          <div className="text-gray-600">Please wait a moment</div>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-white">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Sign Out Button - Top Right */}
      <button
        onClick={() => {
          signOut({ callbackUrl: "/requests/login" });
        }}
        className="absolute top-6 right-6 z-20 px-6 py-2 bg-red text-white font-semibold rounded-lg hover:bg-red/90 transition-colors shadow-lg"
      >
        Sign Out
      </button>

      <Image
        priority
        src={DecoTop}
        alt=""
        className="absolute right-0 max-w-[420px] w-[33%] min-w-[300px] scale-x-[-1] select-none z-0"
      />
      <Image
        priority
        src={DecoBotRight}
        alt=""
        className="absolute left-0 bottom-0 max-w-[420px] w-[33%] min-w-[300px] select-none z-0"
      />

      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-dark-1 mb-4">
              Welcome to Night Login! 🎉
            </h1>
            <p className="text-gray-600 text-lg">
              Let&apos;s set up your profile to get started
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? "bg-red text-white" : "bg-gray-300"}`}>
                1
              </div>
              <div className={`w-20 h-1 ${step >= 2 ? "bg-red" : "bg-gray-300"}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? "bg-red text-white" : "bg-gray-300"}`}>
                2
              </div>
            </div>
          </div>

          {/* Step 1: Role Selection */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roles.map((role) => (
                <button
                  key={role.value}
                  onClick={() => handleRoleSelect(role.value)}
                  className="bg-white border-2 border-gray-200 hover:border-red hover:shadow-lg transition-all rounded-xl p-6 text-center"
                >
                  <div className="text-6xl mb-4">{role.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{role.title}</h3>
                  <p className="text-gray-600 text-sm">{role.description}</p>
                </button>
              ))}
            </div>
          )}

          {/* Step 2: Profile Information */}
          {step === 2 && selectedRole && (
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              <button
                onClick={() => setStep(1)}
                className="text-red hover:underline mb-6 flex items-center gap-2"
              >
                ← Back to role selection
              </button>
              
              <h2 className="text-2xl font-bold mb-2">
                Complete Your {roles.find(r => r.value === selectedRole)?.title} Profile
              </h2>
              <p className="text-gray-600 mb-6">
                Fill in your information to personalize your experience
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {renderRoleFields()}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red text-white py-4 rounded-lg font-semibold hover:bg-red/90 transition disabled:bg-gray-400 disabled:cursor-not-allowed mt-4"
                >
                  {isSubmitting ? "Completing..." : "Complete Onboarding"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
