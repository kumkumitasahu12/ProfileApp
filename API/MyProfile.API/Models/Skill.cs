namespace MyProfile.API.Models
{
    public class Skill
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int UserId { get; set; } // Foreign key to User
        public User User { get; set; }
    }
}