using Microsoft.AspNetCore.Mvc;
using MyProfile.API.Data;
using MyProfile.API.Models;
using MyProfile.API.Services;
using System.Security.Cryptography;
using System.Text;

namespace MyProfile.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;
        private readonly ITokenService _tokenService;
        public AccountController(IAccountRepository accountRepository, ITokenService tokenService)
        {
            _accountRepository = accountRepository;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterDto register)
        {
            using HMACSHA256 hmac = new HMACSHA256();

            if (register == null)
            {
                return BadRequest();
            }
            var user = new User
            {
                Name = register.Name,
                Email = register.Email,
                Phone = register.Phone,
                Age = register.Age,
                PasswordSalt = hmac.Key,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(register.Password))
            };

            _accountRepository.AddUserAsync(user);
            return Ok();
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto login)
        {
            if (login.Email == null || login.Password == null)
            {
                return BadRequest();
            }

            if (_accountRepository.Login(login))
            {
                var jwtToken = _tokenService.GenerateToken(login.Email);
                return Ok(new { Token = jwtToken });

            }

            return Unauthorized("Invalid Credentials");
        }
    }
}
