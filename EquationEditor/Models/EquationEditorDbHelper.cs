using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EquationEditor.Models
{
    public class EquationEditorDbHelper
    {

        public static long SaveEquationFile(EquationFile equationFile)
        {
            long id = 0;
            using (EquationEntities entities = new EquationEntities())
            {
                entities.EquationFiles.Add(equationFile);
                entities.SaveChanges();
                id = equationFile.EquationFileId;
            }
            return id;
        }

        public static void LogActivity(List<int> tagSubjectRelationIds, long equationid)
        {
            using (EquationEntities entities = new EquationEntities())
            {
                foreach (var item in tagSubjectRelationIds)
                {
                    TagSubjectRelationEquation _tagSubjectRelationEquation = new TagSubjectRelationEquation();
                    _tagSubjectRelationEquation.EquationId = equationid;
                    _tagSubjectRelationEquation.TagSubjectRelationId = item;
                    entities.TagSubjectRelationEquations.Add(_tagSubjectRelationEquation);
                    entities.SaveChanges();

                }
            }



        }

        public static void LogError(string errorMessage)
        {
            using (EquationEntities entities = new EquationEntities())
            {
                ErrorLog errorLog = new ErrorLog();
                errorLog.UserId = 1;
                errorLog.ErrorMessage = errorMessage;
                errorLog.InsertDate = DateTime.Now;
                entities.ErrorLogs.Add(errorLog);
                entities.SaveChanges();

            }
        }

        public static IQueryable<EquationFile> GetList()
        {
            EquationEntities _equationListEntities = new EquationEntities();
            var equationList = from e in _equationListEntities.EquationFiles
                               orderby e.EquationFileId
                               select e;

            return equationList;
        }

        public static void Delete(int equationId)
        {
            using (EquationEntities entities = new EquationEntities())
            {
                var equationFile = entities.EquationFiles.FirstOrDefault(x => x.EquationFileId == equationId);
                entities.EquationFiles.Remove(equationFile);
                entities.SaveChanges();
            }
        }
    }
}