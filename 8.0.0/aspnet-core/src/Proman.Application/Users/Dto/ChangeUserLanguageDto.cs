using System.ComponentModel.DataAnnotations;

namespace Proman.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}