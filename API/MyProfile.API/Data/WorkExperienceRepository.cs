using Microsoft.EntityFrameworkCore;
using MyProfile.API.Models;

namespace MyProfile.API.Data
{
    public class WorkExperienceRepository: IWorkExperienceRepository
    {
        private readonly ApplicationDbContext _context;

        public WorkExperienceRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task AddWorkExperienceAsync(WorkExperience workExperience)
        {
            await _context.WorkExperiences.AddAsync(workExperience);
            await _context.SaveChangesAsync();
        }

        public async Task<List<WorkExperience>> GetWorkExperienceAsync(string email)
        {
            return await _context.WorkExperiences.Where(we => we.Email == email).ToListAsync();
        }
    }
}
