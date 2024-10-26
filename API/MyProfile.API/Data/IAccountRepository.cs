using MyProfile.API.Models;

namespace MyProfile.API.Data
{
    public interface IAccountRepository
    {
        Task AddUserAsync(User user);
        bool Login(LoginDto login);
    }
}
