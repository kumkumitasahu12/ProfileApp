using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyProfile.API.Data;
using MyProfile.API.Models;

namespace MyProfile.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly string _uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads");

        public ProfileController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetProfile()
        {
            var email = User.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email not found in token");
            }

            var user = _userRepository.GetUser(email);
            if (user == null)
            {
                return NotFound("Invalid User");
            }
            return Ok(user);
        }

        [HttpPut]
        public IActionResult UpdateProfile([FromBody] UserDto updateDto)
        {
            var email = User.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email not found in token");
            }

            var user = _userRepository.GetUser(email);
            if (user == null)
            {
                return NotFound("Invalid User");
            }

            user.Name = updateDto.Name;
            user.Phone = updateDto.Phone;
            user.Email = updateDto.Email;
            user.Age = updateDto.Age;
            user.Address = updateDto.Address;

            _userRepository.UpdateUser(user);

            return NoContent(); 
        }

        [HttpPost("skills")]
        public IActionResult AddSkill([FromBody] string skillName)
        {
            var email = User.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email not found in token");
            }

            var user = _userRepository.GetUser(email);
            if (user == null)
            {
                return NotFound("Invalid User");
            }

            var newSkill = new Skill
            {
                Name = skillName,
                UserId = user.UserId 
            };

            _userRepository.AddSkill(newSkill);

            return Ok(user.Skills); 
        }
    }
}
