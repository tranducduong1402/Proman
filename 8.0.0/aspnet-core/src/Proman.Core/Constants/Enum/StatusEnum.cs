using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proman.Constants.Enum
{
    public class StatusEnum
    {
        public enum ProjectStatus
        {
            Active = 0,
            Deactive = 1,
        }

        public enum ProjectType
        {
            TimeAndMaterials = 0,
            FixedFee = 1,
            NoneBillable = 2,
            ODC = 3,
            Product = 4,
            Training = 5,
            NoSalary = 6
        }

        public enum ProjectUserType
        {
            Member = 0,
            PM = 1,
            DeActive = 3,
        }

        public enum TaskType
        {
            Task = 0,
            Bug = 1,
        }

        public enum TaskStatus
        {
            New = 0,
            Approved = 1,
            InProgress = 2,
            Testing = 3,
            CodeReview = 4,
            Committed = 5,
            Done = 6,
        }

        public enum PriorityType
        {
            VeryLow = 0,
            Low = 1,
            High = 2,
            VeryHigh = 3,
        }

        public enum UserType
        {
            Staff = 0,
            Internship = 1,
            Collaborators = 2,
            ProbationaryStaff = 3,
            Client = 4,
        }

        public enum UserLevel : byte
        {
            Intern = 0,
            Fresher = 1,
            Junior = 2,
            Middle = 3,
            Senior = 4,
        }

        public enum Sex : byte
        {
            Male = 0,
            Female = 1
        }

        public enum ReviewUserStatus
        {
            New = 0,
            InProgress = 1,
            Close = 2,
        }
    }
}
