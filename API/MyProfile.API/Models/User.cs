using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyProfile.API.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
        public int UserId { get; set; }
        public int Age { get; set; }
        public string Name { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Email { get; set; }
        [Required]
        public string Phone { get; set; }

        public string Address { get; set; }
        public virtual ICollection<Skill> Skills { get; set; } = new List<Skill>();
        public virtual ICollection<Certificate> Certificates { get; set; } = new List<Certificate>();

    }
}
