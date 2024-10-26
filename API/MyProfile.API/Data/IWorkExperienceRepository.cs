using MyProfile.API.Models;

namespace MyProfile.API.Data
{
    public interface IWorkExperienceRepository
    {

        Task AddWorkExperienceAsync(WorkExperience workExperience);
        Task<List<WorkExperience>> GetWorkExperienceAsync(string email);
    }
}
