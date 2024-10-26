using MyProfile.API.Models;

namespace MyProfile.API.Data
{
    public interface IUserRepository
    {       
        User GetUser(string email);
        void UpdateUser(User user);
        void AddSkill(Skill skill);
    }
}
