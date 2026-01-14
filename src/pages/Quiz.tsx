import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Trophy,
  Target,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const Quiz = () => {
  const { id } = useParams();
  const { t, isRTL, language } = useLanguage();
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const NextArrow = isRTL ? ChevronLeft : ChevronRight;
  const PrevArrow = isRTL ? ChevronRight : ChevronLeft;

  const quizData = {
    id: Number(id) || 1,
    title: language === "ar" ? "اختبار أساسيات JavaScript" : "JavaScript Fundamentals Quiz",
    description: language === "ar" 
      ? "اختبر معرفتك بأساسيات JavaScript" 
      : "Test your knowledge of JavaScript basics",
    course: language === "ar" ? "معسكر تطوير الويب الكامل" : "Complete Web Development Bootcamp",
    timeLimit: 15, // minutes
    passingScore: 70,
  };

  const questions: Question[] = [
    {
      id: 1,
      question: language === "ar" 
        ? "ما هو الناتج من: typeof null?" 
        : "What is the output of: typeof null?",
      options: [
        language === "ar" ? '"null"' : '"null"',
        language === "ar" ? '"undefined"' : '"undefined"',
        language === "ar" ? '"object"' : '"object"',
        language === "ar" ? '"boolean"' : '"boolean"',
      ],
      correctAnswer: 2,
      explanation: language === "ar" 
        ? "في JavaScript، typeof null يُرجع 'object' وهذا خطأ معروف في اللغة منذ الإصدارات الأولى." 
        : "In JavaScript, typeof null returns 'object'. This is a known bug in the language since its early versions.",
    },
    {
      id: 2,
      question: language === "ar" 
        ? "أي من التالي ليس نوع بيانات بدائي في JavaScript?" 
        : "Which of the following is NOT a primitive data type in JavaScript?",
      options: [
        "String",
        "Number",
        "Array",
        "Boolean",
      ],
      correctAnswer: 2,
      explanation: language === "ar" 
        ? "Array هو كائن وليس نوع بيانات بدائي. الأنواع البدائية هي: String, Number, Boolean, Null, Undefined, Symbol, BigInt." 
        : "Array is an object, not a primitive data type. Primitives are: String, Number, Boolean, Null, Undefined, Symbol, BigInt.",
    },
    {
      id: 3,
      question: language === "ar" 
        ? "ما الفرق بين == و === في JavaScript?" 
        : "What is the difference between == and === in JavaScript?",
      options: [
        language === "ar" ? "لا يوجد فرق" : "No difference",
        language === "ar" ? "== يقارن القيم فقط، === يقارن القيم والأنواع" : "== compares values only, === compares values and types",
        language === "ar" ? "=== أسرع من ==" : "=== is faster than ==",
        language === "ar" ? "== للأرقام فقط" : "== is for numbers only",
      ],
      correctAnswer: 1,
      explanation: language === "ar" 
        ? "== يقوم بتحويل الأنواع قبل المقارنة (loose equality)، بينما === يقارن القيم والأنواع معاً (strict equality)." 
        : "== performs type coercion before comparison (loose equality), while === compares both values and types (strict equality).",
    },
    {
      id: 4,
      question: language === "ar" 
        ? "ما هي النتيجة: console.log(1 + '2' + 3)?" 
        : "What is the result of: console.log(1 + '2' + 3)?",
      options: [
        "6",
        '"123"',
        '"33"',
        "NaN",
      ],
      correctAnswer: 1,
      explanation: language === "ar" 
        ? "عندما يتم جمع رقم مع نص، يتحول الرقم إلى نص. لذلك 1 + '2' = '12'، ثم '12' + 3 = '123'." 
        : "When a number is added to a string, the number is converted to a string. So 1 + '2' = '12', then '12' + 3 = '123'.",
    },
    {
      id: 5,
      question: language === "ar" 
        ? "أي دالة تُستخدم لتحويل JSON إلى كائن JavaScript?" 
        : "Which function is used to parse JSON to a JavaScript object?",
      options: [
        "JSON.stringify()",
        "JSON.parse()",
        "JSON.toObject()",
        "JSON.convert()",
      ],
      correctAnswer: 1,
      explanation: language === "ar" 
        ? "JSON.parse() يحول نص JSON إلى كائن JavaScript، بينما JSON.stringify() يحول كائن إلى نص JSON." 
        : "JSON.parse() converts a JSON string to a JavaScript object, while JSON.stringify() converts an object to a JSON string.",
    },
    {
      id: 6,
      question: language === "ar" 
        ? "ما هو الـ closure في JavaScript?" 
        : "What is a closure in JavaScript?",
      options: [
        language === "ar" ? "نوع من الحلقات" : "A type of loop",
        language === "ar" ? "دالة تحتفظ بالوصول لنطاقها الخارجي" : "A function that retains access to its outer scope",
        language === "ar" ? "طريقة لإغلاق البرنامج" : "A way to close the program",
        language === "ar" ? "نوع من الأخطاء" : "A type of error",
      ],
      correctAnswer: 1,
      explanation: language === "ar" 
        ? "الـ closure هو دالة تحتفظ بالوصول إلى المتغيرات من نطاقها الخارجي حتى بعد انتهاء تنفيذ الدالة الخارجية." 
        : "A closure is a function that retains access to variables from its outer scope even after the outer function has finished executing.",
    },
    {
      id: 7,
      question: language === "ar" 
        ? "ما هو الناتج من: [1, 2, 3].map(x => x * 2)?" 
        : "What is the output of: [1, 2, 3].map(x => x * 2)?",
      options: [
        "[1, 2, 3]",
        "[2, 4, 6]",
        "6",
        "[1, 4, 9]",
      ],
      correctAnswer: 1,
      explanation: language === "ar" 
        ? "map() تُنشئ مصفوفة جديدة بتطبيق الدالة على كل عنصر. هنا كل عنصر يُضرب في 2." 
        : "map() creates a new array by applying the function to each element. Here each element is multiplied by 2.",
    },
    {
      id: 8,
      question: language === "ar" 
        ? "أي كلمة مفتاحية تُستخدم للإعلان عن ثابت في JavaScript؟" 
        : "Which keyword is used to declare a constant in JavaScript?",
      options: [
        "var",
        "let",
        "const",
        "static",
      ],
      correctAnswer: 2,
      explanation: language === "ar" 
        ? "const تُستخدم للإعلان عن ثوابت لا يمكن إعادة تعيين قيمتها. let للمتغيرات القابلة للتغيير، و var للنطاق الوظيفي." 
        : "const is used to declare constants that cannot be reassigned. let is for mutable variables, and var has function scope.",
    },
    {
      id: 9,
      question: language === "ar" 
        ? "ما هو Promise في JavaScript؟" 
        : "What is a Promise in JavaScript?",
      options: [
        language === "ar" ? "نوع من المصفوفات" : "A type of array",
        language === "ar" ? "كائن يمثل إتمام أو فشل عملية غير متزامنة" : "An object representing the eventual completion or failure of an async operation",
        language === "ar" ? "طريقة لتعريف الدوال" : "A way to define functions",
        language === "ar" ? "نوع من الأحداث" : "A type of event",
      ],
      correctAnswer: 1,
      explanation: language === "ar" 
        ? "Promise هو كائن يمثل القيمة النهائية (أو الفشل) لعملية غير متزامنة، ويمكن أن يكون في حالة pending, fulfilled, أو rejected." 
        : "A Promise is an object representing the eventual completion (or failure) of an asynchronous operation. It can be pending, fulfilled, or rejected.",
    },
    {
      id: 10,
      question: language === "ar" 
        ? "ما هو الـ hoisting في JavaScript؟" 
        : "What is hoisting in JavaScript?",
      options: [
        language === "ar" ? "نقل الإعلانات إلى أعلى النطاق" : "Moving declarations to the top of the scope",
        language === "ar" ? "حذف المتغيرات غير المستخدمة" : "Deleting unused variables",
        language === "ar" ? "تحسين أداء الكود" : "Optimizing code performance",
        language === "ar" ? "إضافة أخطاء للكود" : "Adding errors to code",
      ],
      correctAnswer: 0,
      explanation: language === "ar" 
        ? "الـ hoisting هو سلوك JavaScript الافتراضي لنقل الإعلانات إلى أعلى النطاق الحالي. var تُرفع مع قيمة undefined، بينما let و const تُرفع لكن لا يمكن الوصول إليها قبل الإعلان." 
        : "Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope. var is hoisted with undefined, while let and const are hoisted but not accessible before declaration.",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quizData.timeLimit * 60);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizCompleted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  const handleSubmit = () => {
    setQuizCompleted(true);
  };

  const handleRetry = () => {
    setSelectedAnswers(new Array(questions.length).fill(null));
    setQuizCompleted(false);
    setCurrentQuestion(0);
    setShowExplanation(false);
    setTimeRemaining(quizData.timeLimit * 60);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
    };
  };

  const score = calculateScore();
  const passed = score.percentage >= quizData.passingScore;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <BackArrow className="w-4 h-4" />
              {t("quiz.backToDashboard")}
            </Link>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <HelpCircle className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">{quizData.title}</CardTitle>
                <CardDescription>{quizData.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-secondary/50 rounded-xl">
                    <HelpCircle className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-foreground">{questions.length}</p>
                    <p className="text-sm text-muted-foreground">{t("quiz.questions")}</p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-xl">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-foreground">{quizData.timeLimit}</p>
                    <p className="text-sm text-muted-foreground">{t("quiz.minutes")}</p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-xl">
                    <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-foreground">{quizData.passingScore}%</p>
                    <p className="text-sm text-muted-foreground">{t("quiz.passingScore")}</p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-xl p-4 text-start">
                  <h3 className="font-semibold mb-2">{t("quiz.instructions")}</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {t("quiz.instruction1")}</li>
                    <li>• {t("quiz.instruction2")}</li>
                    <li>• {t("quiz.instruction3")}</li>
                    <li>• {t("quiz.instruction4")}</li>
                  </ul>
                </div>

                <Button size="lg" variant="hero" onClick={() => setQuizStarted(true)} className="w-full">
                  {t("quiz.startQuiz")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card className="text-center">
              <CardHeader>
                <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                  passed ? "bg-green-500/10" : "bg-red-500/10"
                }`}>
                  {passed ? (
                    <Trophy className="w-10 h-10 text-green-500" />
                  ) : (
                    <XCircle className="w-10 h-10 text-red-500" />
                  )}
                </div>
                <CardTitle className="text-2xl">
                  {passed ? t("quiz.congratulations") : t("quiz.tryAgain")}
                </CardTitle>
                <CardDescription>
                  {passed ? t("quiz.passedMessage") : t("quiz.failedMessage")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-6xl font-bold text-foreground">{score.percentage}%</div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-green-500/10 rounded-xl">
                    <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-green-500" />
                    <p className="text-2xl font-bold text-foreground">{score.correct}</p>
                    <p className="text-sm text-muted-foreground">{t("quiz.correct")}</p>
                  </div>
                  <div className="p-4 bg-red-500/10 rounded-xl">
                    <XCircle className="w-6 h-6 mx-auto mb-2 text-red-500" />
                    <p className="text-2xl font-bold text-foreground">{score.total - score.correct}</p>
                    <p className="text-sm text-muted-foreground">{t("quiz.incorrect")}</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-xl">
                    <Award className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-foreground">{quizData.passingScore}%</p>
                    <p className="text-sm text-muted-foreground">{t("quiz.required")}</p>
                  </div>
                </div>

                {/* Review Answers */}
                <div className="text-start space-y-4 max-h-96 overflow-y-auto">
                  <h3 className="font-semibold">{t("quiz.reviewAnswers")}</h3>
                  {questions.map((q, index) => {
                    const isCorrect = selectedAnswers[index] === q.correctAnswer;
                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-xl border ${
                          isCorrect ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-foreground mb-2">
                              {index + 1}. {q.question}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {t("quiz.yourAnswer")}: <span className={isCorrect ? "text-green-500" : "text-red-500"}>
                                {selectedAnswers[index] !== null ? q.options[selectedAnswers[index]] : t("quiz.noAnswer")}
                              </span>
                            </p>
                            {!isCorrect && (
                              <p className="text-sm text-green-500">
                                {t("quiz.correctAnswer")}: {q.options[q.correctAnswer]}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={handleRetry} className="flex-1 gap-2">
                    <RotateCcw className="w-4 h-4" />
                    {t("quiz.retake")}
                  </Button>
                  <Link to="/dashboard" className="flex-1">
                    <Button variant="hero" className="w-full">
                      {t("quiz.backToDashboard")}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="bg-card rounded-2xl border border-border/50 p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h1 className="font-bold text-foreground">{quizData.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatTime(timeRemaining)}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Progress value={progress} className="flex-1 h-2" />
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1}/{questions.length}
              </span>
            </div>
          </div>

          {/* Question Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">
                {t("quiz.question")} {currentQuestion + 1}
              </CardTitle>
              <CardDescription className="text-base text-foreground font-medium">
                {currentQ.question}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestion] === index;
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 rounded-xl border-2 text-start transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50 hover:bg-secondary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className={isSelected ? "text-foreground font-medium" : "text-foreground"}>
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="gap-2"
            >
              <PrevArrow className="w-4 h-4" />
              {t("quiz.previous")}
            </Button>

            <div className="flex gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                    index === currentQuestion
                      ? "bg-primary text-primary-foreground"
                      : selectedAnswers[index] !== null
                      ? "bg-green-500/20 text-green-600"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestion === questions.length - 1 ? (
              <Button
                variant="hero"
                onClick={handleSubmit}
                disabled={selectedAnswers.some((a) => a === null)}
                className="gap-2"
              >
                {t("quiz.submit")}
                <CheckCircle2 className="w-4 h-4" />
              </Button>
            ) : (
              <Button variant="outline" onClick={handleNext} className="gap-2">
                {t("quiz.next")}
                <NextArrow className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Explanation Dialog */}
          <Dialog open={showExplanation} onOpenChange={setShowExplanation}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("quiz.explanation")}</DialogTitle>
                <DialogDescription>{currentQ.explanation}</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Quiz;
