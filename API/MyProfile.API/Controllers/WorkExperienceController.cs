using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyProfile.API.Data;
using MyProfile.API.Models;

namespace MyProfile.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WorkExperienceController : ControllerBase
    {
        private readonly IWorkExperienceRepository _workExperienceRepository;
        public WorkExperienceController(IWorkExperienceRepository workExperienceRepository)
        {
            _workExperienceRepository = workExperienceRepository;
        }        

        [HttpGet]
        public async Task<IActionResult> GetWorkExperiences()
        {
            var email = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress");
            if (email == null)
            {
                return BadRequest("Email not found in token");
            }
            var workExperiences = await _workExperienceRepository.GetWorkExperienceAsync(email.Value);
            return Ok(workExperiences);
        }

        [HttpPost]
        public async Task<IActionResult> AddWorkExperience([FromBody] WorkExperienceDto workExperience)
        {
            if (workExperience == null)
            {
                return BadRequest("Work experience is null.");
            }
            var workEx = new WorkExperience
            {
                JobTitle = workExperience.JobTitle,
                CompanyName = workExperience.CompanyName,
                Duration = workExperience.Duration,
                Description = workExperience.Description,
                Email = User.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value

            };

            await _workExperienceRepository.AddWorkExperienceAsync(workEx);
            return Ok(new { message = "Work experience added successfully." });
        }
    }
}
