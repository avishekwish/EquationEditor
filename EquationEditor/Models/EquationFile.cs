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
    
    public partial class EquationFile
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public EquationFile()
        {
            this.TagSubjectRelationEquations = new HashSet<TagSubjectRelationEquation>();
        }
    
        public long EquationFileId { get; set; }
        public string Equationfile1 { get; set; }
        public string UserIp { get; set; }
        public string BrowserName { get; set; }
        public System.DateTime InsertDate { get; set; }
        public System.DateTime UpdateDate { get; set; }
        public Nullable<int> DownLoadCount { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TagSubjectRelationEquation> TagSubjectRelationEquations { get; set; }
    }
}
