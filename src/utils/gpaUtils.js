const getGradePoint = (grade, gradingSystem) => {
    const found = gradingSystem.find(item => item.grade === grade);
    return parseFloat(found?.gradePoint) ?? 0;
}

export const getTotalCredits = (modules) => {
    return modules.reduce((sum, module) => (sum + module.credit), 0)
}

export const getCalculateGPA = (modules, gradingSystem) => {
    const totalCreditsAndGradePoint = modules.reduce((sum, module) => (sum + (module.credit * getGradePoint(module.grade, gradingSystem))), 0);
    const totalCredits = getTotalCredits(modules);
    return totalCredits > 0 ? (totalCreditsAndGradePoint / totalCredits).toFixed(2) : 0;
}

export const getClassName = (gpa, classSystem) => {
    const foundClass = classSystem.find(item => {
        const isMinOk = gpa >= item.min;
        const isMaxOk = item.max === null ? true : gpa <= item.max;
        return isMinOk && isMaxOk;
    })
    return foundClass?.name ?? 'Not Pass';
}