using Microsoft.EntityFrameworkCore;
using MyProfile.API.Models;
using System.Security.Cryptography;
using System.Text;

namespace MyProfile.API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        
        public User GetUser(string email)
        {
            var user = _context.User
        .Include(u => u.Skills) // Eager load the Skills
        .FirstOrDefault(x => x.Email == email);
            return user;
        }

        public void UpdateUser(User user)
        {
            _context.User.Update(user);

            _context.SaveChanges();
        }
        public void AddSkill(Skill skill)
        {
            _context.Skills.Add(skill);
            _context.SaveChanges();
        }
    }
}
