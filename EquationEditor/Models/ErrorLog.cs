//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EquationEditor.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class ErrorLog
    {
        public long ErrorLogId { get; set; }
        public string ErrorMessage { get; set; }
        public System.DateTime InsertDate { get; set; }
        public long UserId { get; set; }
    }
}
