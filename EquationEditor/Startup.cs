using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EquationEditor.Startup))]
namespace EquationEditor
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
