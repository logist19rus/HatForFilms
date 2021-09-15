using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Classes
{
    public class Token
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string token { get; set; }
        public DateTime LastActivity { get; set; }

        public virtual User User { get; set; }
    }
}
