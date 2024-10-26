namespace MyProfile.API.Services
{
    public interface ITokenService
    {
        string GenerateToken(string email);
    }
}
