using MyProfile.API.Models;
using System.Security.Cryptography;
using System.Text;

namespace MyProfile.API.Data
{
    public class AccountRepository: IAccountRepository
    {
        private readonly ApplicationDbContext _context;

        public AccountRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Task AddUserAsync(User user)
        {
            _context.User.Add(user);
            _context.SaveChanges();
            return Task.CompletedTask;
        }

        public bool Login(LoginDto login)
        {

            var user = _context.User.SingleOrDefault(u => u.Email == login.Email);
            if (user == null)
            {
                return false;
            }
            using var hmac = new HMACSHA256(user.PasswordSalt); // Use the stored salt for hashing
            var passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));

            // Verify if the computed hash matches the stored hash
            if (!user.PasswordHash.SequenceEqual(passwordHash))
            {

                return false;
            }

            return true;
        }
    }
}
