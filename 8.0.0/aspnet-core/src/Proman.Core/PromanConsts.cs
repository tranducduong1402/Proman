using Proman.Debugging;

namespace Proman
{
    public class PromanConsts
    {
        public const string LocalizationSourceName = "Proman";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "52c75843bf3f4af58b4dbcb22cff1364";
    }
}
