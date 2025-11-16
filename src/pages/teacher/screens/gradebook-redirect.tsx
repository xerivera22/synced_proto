import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TeacherGradebookRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    let id: string | null = null;
    try {
      id = localStorage.getItem("teacher.lastSubjectId");
    } catch {
      id = null;
    }
    if (id) navigate(`/teacher/subjects/${id}?tab=class-records`, { replace: true });
    else navigate("/teacher/subjects", { replace: true });
  }, [navigate]);
  return null;
}
