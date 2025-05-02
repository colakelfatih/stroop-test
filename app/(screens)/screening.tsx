import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';

type Language = 'tr' | 'en' | 'de';
type OptionKey = 'never' | 'sometimes' | 'often' | 'veryOften';

interface Translations {
  [key: string]: {
    title: string;
    showResults: string;
    totalScore: string;
    riskLevels: {
      low: string;
      medium: string;
      high: string;
    };
    options: {
      [key in OptionKey]: string;
    };
  };
}

const translations: Translations = {
  tr: {
    title: "Tarama Ölçeği",
    showResults: "Sonucu Göster",
    totalScore: "Toplam Puan",
    riskLevels: {
      low: "Düşük risk",
      medium: "Orta risk",
      high: "Yüksek risk"
    },
    options: {
      never: "Hiç yok",
      sometimes: "Biraz",
      often: "Oldukça fazla",
      veryOften: "Çok fazla"
    }
  },
  en: {
    title: "Screening Scale",
    showResults: "Show Results",
    totalScore: "Total Score",
    riskLevels: {
      low: "Low risk",
      medium: "Medium risk",
      high: "High risk"
    },
    options: {
      never: "Never",
      sometimes: "Sometimes",
      often: "Often",
      veryOften: "Very Often"
    }
  },
  de: {
    title: "Screening-Skala",
    showResults: "Ergebnisse anzeigen",
    totalScore: "Gesamtpunktzahl",
    riskLevels: {
      low: "Geringes Risiko",
      medium: "Mittleres Risiko",
      high: "Hohes Risiko"
    },
    options: {
      never: "Nie",
      sometimes: "Manchmal",
      often: "Oft",
      veryOften: "Sehr oft"
    }
  }
};

const questions = {
  tr: [
    "1. Çoğu zaman dikkatini ayrıntılara veremez ya da ödevlerinde, işlerinde ya da diğer etkinliklerinde dikkatsizce hatalar yapar.",
    "2. Çoğu zaman üzerine aldığı görevlerde ya da etkinliklerde dikkati dağılır.",
    "3. Doğrudan kendisine konuşulduğunda çoğu zaman dinlemiyormuş gibi görünür.",
    "4. Çoğu zaman emirlere uyamaz ve okul ödevlerini, ufak tefek işleri ya da işyerindeki görevlerini tamamlayamaz (kendisinden isteneni anlamamaya bağlı değildir).",
    "5. Çoğu zaman üzerine aldığı görevleri ve etkinlikleri düzenlemekte ve planlamakta zorluk çeker.",
    "6. Çoğu zaman sürekli kafa çalıştırmayı gerektiren görevlerden kaçınır, bunları sevmez ya da bunlarda yer almaya karşı isteksizdir.",
    "7. Çoğu zaman üzerine aldığı görevler ya da etkinlikler için gerekli olan şeyleri kaybeder (örneğin; oyuncaklar, okul ödevleri, kalemler, kitaplar ya da araç gereçler).",
    "8. Çoğu zaman dikkati dış uyaranlarla kolaylıkla dağılır.",
    "9. Günlük etkinliklerinde çoğu zaman unutkandır.",
    "10. Çoğu zaman elleri, ayakları kıpır kıpırdır ya da oturduğu yerde kıpırdanıp durur.",
    "11. Çoğu zaman sınıfta ya da oturması beklenen diğer durumlarda oturduğu yerden kalkar ve dolaşır.",
    "12. Çoğu zaman uygunsuz olan durumlarda koşuşturup durur ya da tırmanır (ergenlerde sadece kendisinin algıladığı huzursuzluk duyguları olabilir).",
    "13. Çoğu zaman sakin bir biçimde boş zamanları geçirme ve oyunuma zorluğu vardır.",
    "14. Çoğu zaman hareket halindedir ya da motor takmış gibi hareket eder.",
    "15. Çoğu zaman çok konuşur.",
    "16. Çoğu zaman sorulan soru tamamlanmadan önce cevabı yapıştırır.",
    "17. Çoğu zaman sırasını bekleme güçlüğü vardır.",
    "18. Çoğu zaman başkalarının sözünü keser ya da yaptıklarının arasına girer (örneğin; başkalarının oyunlarına ya da konuşmalarına burnunu sokar).",
    "19. Sık sık öfkelenir.",
    "20. Sık sık büyükleriyle tartışmaya girer.",
    "21. Büyüklerinin isteklerine ya da kurallarına uymaya çoğu zaman etkin bir biçimde karşı gelir ya da bunları reddeder.",
    "22. Çoğu zaman, isteyerek, başkalarını kızdıran şeyler yapar.",
    "23. Kendi yaramazlıkları için çoğu zaman başkalarını suçlar.",
    "24. Çoğu zaman alıngandır, çabuk darılır ve başkalarınca kolay kızdırılır.",
    "25. Çoğu zaman içerler, kızgın ve güceniktir.",
    "26. Çoğu zaman kincidir ve intikam almak ister.",
    "27. Çoğu zaman başkalarına kabadayılık eder, gözdağı verir ya da gözünü korkutur.",
    "28. Çoğu zaman kavga-dövüş başlatır.",
    "29. Başkalarının ciddi bir biçimde fiziksel olarak yaralanmasına neden olacak bir silah kullanmıştır (örneğin bir değnek, taş, kırık şişe, bıçak vb.).",
    "30. İnsanlara fiziksel olarak acımasız davranmıştır.",
    "31. Hayvanlara karşı fiziksel olarak acımasız davranmıştır.",
    "32. Başkasının gözü önünde çalmıştır (örneğin saldırıp soyma, çanta kapıp kaçma, göz korkutarak alma, silahlı soygun).",
    "33. Birisini cinsel etkinlikte bulunması için zorlamıştır.",
    "34. Ciddi hasar vermek amacıyla isteyerek yangın çıkarmıştır.",
    "35. İsteyerek başkalarının malına mülküne zarar vermiştir (yangın çıkarma dışında).",
    "36. Bir başkasının evine, binasına ya da arabasına zorla girmiştir.",
    "37. Bir şey elde etmek, bir çıkar sağlamak ya da yükümlülüklerinden kaçınmak için çoğu zaman yalan söyler (yani başkalarını atlatır).",
    "38. Hiç kimse görmeden değerli şeyler çalmıştır (örneğin; marketten gizlice mal çalma; sahtekârlık).",
    "39. 13 yaşından önce başlayarak, ailenin yasaklarına karşın çoğu geceyi dışarıda geçirmiştir.",
    "40. Anne-babasına ya da onların yerini tutan kişilerin evinde yaşarken en az iki kez gece evden kaçmıştır (ya da uzun bir süre geri dönmemişse bir kez).",
    "41. 13 yaşından önce başlayarak, çoğu zaman okuldan kaçmıştır."
  ],
  en: [
    "1. Often fails to give close attention to details or makes careless mistakes in schoolwork, work, or other activities.",
    "2. Often has difficulty concentrating on tasks or staying focused on activities.",
    "3. Directly asked to do something, often does not listen or does not seem to hear.",
    "4. Often does not follow instructions or does not complete schoolwork, chores, or work assignments.",
    "5. Often has difficulty organizing tasks and activities.",
    "6. Often avoids tasks or activities that require sustained mental effort, dislikes, or avoids them.",
    "7. Often loses things necessary for tasks or activities (e.g., toys, school assignments, pencils, books, or tools).",
    "8. Often gets distracted by extraneous stimuli.",
    "9. Often forgets things easily.",
    "10. Often fidgets with hands or feet, or squirms in seat.",
    "11. Often leaves seat in classroom or in places where remaining seated is expected.",
    "12. Often runs about or climbs excessively in situations where remaining seated is inappropriate.",
    "13. Often has difficulty playing quietly.",
    "14. Often is overly active in inappropriate situations.",
    "15. Often talks excessively.",
    "16. Often blurts out answers before questions have been completed.",
    "17. Often has difficulty waiting his or her turn in situations that involve waiting.",
    "18. Often interrupts or intrudes on others (e.g., butts into conversations or games).",
    "19. Often loses temper.",
    "20. Often argues with adults.",
    "21. Often refuses to follow rules or comply with requests.",
    "22. Often disobeys rules or requests.",
    "23. Often blames others for his or her mistakes or misbehavior.",
    "24. Often feels entitled to special favors or treatment.",
    "25. Often feels that rules are not meant for him or her.",
    "26. Often seeks revenge on others.",
    "27. Often is spiteful or vindictive towards others.",
    "28. Often starts quarrels or fights.",
    "29. Often uses physical force in aggressive ways.",
    "30. Often hurts animals.",
    "31. Often is cruel to or aggressive towards children or other people.",
    "32. Often threatens or intimidates other children or adults.",
    "33. Often engages in sexual intercourse before the age of 13.",
    "34. Often engages in arson.",
    "35. Often steals from others.",
    "36. Often lies to avoid punishment or get out of trouble.",
    "37. Often steals from others.",
    "38. Often lies to avoid punishment or get out of trouble.",
    "39. Often stays out late at night without telling anyone.",
    "40. Often stays out late at night without telling anyone.",
    "41. Often stays out late at night without telling anyone."
  ],
  de: [
    "1. Oft achtet nicht auf Details oder macht Flüchtigkeitsfehler bei Schularbeiten, Arbeit oder anderen Aktivitäten.",
    "2. Oft hat Schwierigkeiten, die Aufmerksamkeit bei Aufgaben oder Spielen aufrechtzuerhalten.",
    "3. Oft scheint nicht zuzuhören, wenn direkt angesprochen.",
    "4. Oft folgt Anweisungen nicht und erledigt Schularbeiten, Aufgaben oder Pflichten am Arbeitsplatz nicht.",
    "5. Oft hat Schwierigkeiten, Aufgaben und Aktivitäten zu organisieren.",
    "6. Oft vermeidet, mag nicht oder zögert, sich mit Aufgaben zu beschäftigen, die länger andauernde geistige Anstrengung erfordern.",
    "7. Oft verliert Gegenstände, die für Aufgaben oder Aktivitäten notwendig sind.",
    "8. Oft wird durch äußere Reize leicht abgelenkt.",
    "9. Oft ist bei Alltagsaktivitäten vergesslich.",
    "10. Oft zappelt mit Händen oder Füßen oder rutscht auf dem Stuhl herum.",
    "11. Oft steht in der Klasse oder in anderen Situationen auf, in denen Sitzenbleiben erwartet wird.",
    "12. Oft läuft herum oder klettert exzessiv in Situationen, in denen dies unpassend ist.",
    "13. Oft hat Schwierigkeiten, ruhig zu spielen oder sich mit Freizeitaktivitäten ruhig zu beschäftigen.",
    "14. Oft ist 'auf Achse' oder handelt oftmals, als wäre er/sie 'getrieben'.",
    "15. Oft redet übermäßig viel.",
    "16. Oft platzt mit Antworten heraus, bevor die Frage zu Ende gestellt ist.",
    "17. Oft hat Schwierigkeiten zu warten, bis er/sie an der Reihe ist.",
    "18. Oft unterbricht oder stört andere.",
    "19. Oft verliert die Beherrschung.",
    "20. Oft streitet sich mit Erwachsenen.",
    "21. Oft widersetzt sich aktiv oder weigert sich, Anforderungen von Erwachsenen zu entsprechen oder Regeln zu befolgen.",
    "22. Oft verärgert andere absichtlich.",
    "23. Oft schiebt die Schuld für eigenes Fehlverhalten auf andere.",
    "24. Oft ist empfindlich oder lässt sich leicht von anderen verärgern.",
    "25. Oft ist zornig oder ärgerlich.",
    "26. Oft ist boshaft oder rachsüchtig.",
    "27. Oft schikaniert, droht oder schüchtert andere ein.",
    "28. Oft fängt Schlägereien an.",
    "29. Oft hat eine Waffe benutzt, die anderen ernsthaft körperlichen Schaden zufügen kann.",
    "30. Oft ist körperlich grausam zu Menschen gewesen.",
    "31. Oft ist körperlich grausam zu Tieren gewesen.",
    "32. Oft hat gestohlen, während er/sie mit dem Opfer konfrontiert war.",
    "33. Oft hat jemanden zu sexuellen Handlungen gezwungen.",
    "34. Oft hat vorsätzlich Feuer gelegt mit der Absicht, ernsthaften Schaden zu verursachen.",
    "35. Oft hat vorsätzlich Eigentum anderer zerstört.",
    "36. Oft ist in das Haus, Gebäude oder Auto eines anderen eingebrochen.",
    "37. Oft lügt, um Vorteile zu erlangen oder Verpflichtungen zu entgehen.",
    "38. Oft hat wertvolle Gegenstände gestohlen, ohne mit dem Opfer konfrontiert zu werden.",
    "39. Oft bleibt über Nacht weg von zu Hause, ohne Erlaubnis.",
    "40. Oft ist von zu Hause weggelaufen über Nacht.",
    "41. Oft schwänzt die Schule."
  ]
};

const options = [
  { label: translations.tr.options.never, value: 0 },
  { label: translations.tr.options.sometimes, value: 1 },
  { label: translations.tr.options.often, value: 2 },
  { label: translations.tr.options.veryOften, value: 3 }
];

export default function ScreeningScale() {
  const [answers, setAnswers] = useState<number[]>(Array(41).fill(-1));
  const [showResult, setShowResult] = useState(false);
  const [language, setLanguage] = useState<Language>('tr');

  const handleAnswer = (questionIndex: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    const totalScore = answers.reduce((sum, answer) => sum + (answer === -1 ? 0 : answer), 0);
    return totalScore;
  };

  const isAllAnswered = () => {
    return answers.every(answer => answer !== -1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{translations[language].title}</Text>
        <View style={styles.languageButtonsContainer}>
          <TouchableOpacity 
            style={[styles.languageButton, language === 'tr' && styles.selectedLanguageButton]} 
            onPress={() => setLanguage('tr')}
          >
            <Text style={[styles.languageButtonText, language === 'tr' && styles.selectedLanguageButtonText]}>TR</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.languageButton, language === 'en' && styles.selectedLanguageButton]} 
            onPress={() => setLanguage('en')}
          >
            <Text style={[styles.languageButtonText, language === 'en' && styles.selectedLanguageButtonText]}>EN</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.languageButton, language === 'de' && styles.selectedLanguageButton]} 
            onPress={() => setLanguage('de')}
          >
            <Text style={[styles.languageButtonText, language === 'de' && styles.selectedLanguageButtonText]}>DE</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {questions[language].map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question}</Text>
            <View style={styles.optionsContainer}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionButton,
                    answers[index] === option.value && styles.selectedOption
                  ]}
                  onPress={() => handleAnswer(index, option.value)}
                >
                  <Text style={[
                    styles.optionText,
                    answers[index] === option.value && styles.selectedOptionText
                  ]}>
                    {translations[language].options[Object.keys(translations[language].options)[option.value] as OptionKey]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      
      <TouchableOpacity
        style={[styles.submitButton, !isAllAnswered() && styles.disabledButton]}
        onPress={() => setShowResult(true)}
        disabled={!isAllAnswered()}
      >
        <Text style={styles.submitButtonText}>{translations[language].showResults}</Text>
      </TouchableOpacity>

      {showResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{translations[language].totalScore}: {calculateScore()}</Text>
          <Text style={styles.resultText}>
            {calculateScore() < 20 ? translations[language].riskLevels.low :
             calculateScore() < 40 ? translations[language].riskLevels.medium :
             translations[language].riskLevels.high}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  languageButtonsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  languageButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    minWidth: 40,
    alignItems: 'center',
  },
  selectedLanguageButton: {
    backgroundColor: '#007AFF',
  },
  languageButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  selectedLanguageButtonText: {
    color: 'white',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  questionContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    minWidth: 100,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  selectedOptionText: {
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    padding: 20,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    elevation: 2,
  },
  resultText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 5,
    color: '#333',
  },
}); 