import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { sendToTelegram, FormData } from '../utils/telegram';

export function ApplicationForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    age: 0,
    phone: '',
    telegram: '',
    region: '',
    district: '',
    address: '',
    skills: '',
    goal: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Ism va familiyangizni kiriting';
    }

    if (!formData.age || formData.age < 14 || formData.age > 100) {
      newErrors.age = 'Yoshingizni to\'g\'ri kiriting (14-100)';
    }

    if (!formData.phone.trim() || !formData.phone.startsWith('+998')) {
      newErrors.phone = 'Telefon raqamni +998 formatida kiriting';
    }

    if (!formData.telegram.trim() || !formData.telegram.startsWith('@')) {
      newErrors.telegram = 'Telegram username @ bilan boshlangan bo\'lishi kerak';
    }

    if (!formData.region.trim()) {
      newErrors.region = 'Viloyatni tanlang';
    }

    if (!formData.district.trim()) {
      newErrors.district = 'Tuman/Shaharni kiriting';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Ko\'cha va uy raqamni kiriting';
    }

    if (!formData.skills.trim()) {
      newErrors.skills = 'Skillaringizni kiriting';
    }

    if (!formData.goal.trim()) {
      newErrors.goal = 'Maqsadingizni kiriting';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setShowSuccess(false);

    const success = await sendToTelegram(formData);

    if (success) {
      setShowSuccess(true);
      setFormData({
        fullName: '',
        age: 0,
        phone: '+998',
        telegram: '@',
        region: '',
        district: '',
        address: '',
        skills: '',
        goal: '',
      });
      setErrors({});

      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } else {
      setErrors({
        submit: 'Xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.',
      });
    }

    setIsSubmitting(false);
  };

  const handleChange = (
    field: keyof FormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const regions = [
    'Toshkent',
    'Andijon',
    'Buxoro',
    'Farg\'ona',
    'Jizzax',
    'Xorazm',
    'Namangan',
    'Navoiy',
    'Qashqadaryo',
    'Qoraqalpog\'iston',
    'Samarqand',
    'Sirdaryo',
    'Surxondaryo',
    'Toshkent viloyati',
  ];

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto p-6 md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-500/20 p-8 md:p-10"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-3">
            Ariza Topshirish
          </h1>
          <p className="text-gray-400 text-lg">
            Ma'lumotlaringizni to'ldiring va yuborishni bosing
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-cyan-400 font-semibold mb-2">
              Ism va Familiya *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              placeholder="Ism va familiyangizni kiriting"
            />
            {errors.fullName && (
              <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
            )}
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <div>
              <label className="block text-cyan-400 font-semibold mb-2">
                Yosh *
              </label>
              <input
                type="number"
                value={formData.age || ''}
                onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                placeholder="18"
                min="14"
                max="100"
              />
              {errors.age && (
                <p className="text-red-400 text-sm mt-1">{errors.age}</p>
              )}
            </div>

            <div>
              <label className="block text-cyan-400 font-semibold mb-2">
                Telefon raqam *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                placeholder="+998 90 123 45 67"
              />
              {errors.phone && (
                <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-cyan-400 font-semibold mb-2">
              Telegram username *
            </label>
            <input
              type="text"
              value={formData.telegram}
              onChange={(e) => handleChange('telegram', e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              placeholder="@username"
            />
            {errors.telegram && (
              <p className="text-red-400 text-sm mt-1">{errors.telegram}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <label className="block text-purple-400 font-semibold mb-3 text-lg">
              📍 Qayerdanligi
            </label>

            <div className="space-y-4">
              <div>
                <label className="block text-cyan-400 font-medium mb-2">
                  Viloyat *
                </label>
                <select
                  value={formData.region}
                  onChange={(e) => handleChange('region', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                >
                  <option value="">Viloyatni tanlang</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                {errors.region && (
                  <p className="text-red-400 text-sm mt-1">{errors.region}</p>
                )}
              </div>

              <div>
                <label className="block text-cyan-400 font-medium mb-2">
                  Tuman / Shahar *
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => handleChange('district', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="Tuman yoki shahar nomini kiriting"
                />
                {errors.district && (
                  <p className="text-red-400 text-sm mt-1">{errors.district}</p>
                )}
              </div>

              <div>
                <label className="block text-cyan-400 font-medium mb-2">
                  Ko'cha va uy raqami *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="Ko'cha va uy raqami"
                />
                {errors.address && (
                  <p className="text-red-400 text-sm mt-1">{errors.address}</p>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-cyan-400 font-semibold mb-2">
              🛠 Skillari *
            </label>
            <textarea
              value={formData.skills}
              onChange={(e) => handleChange('skills', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
              placeholder="React, JavaScript, Python, Design va boshqa bilgan texnologiyalaringiz"
            />
            {errors.skills && (
              <p className="text-red-400 text-sm mt-1">{errors.skills}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            <label className="block text-cyan-400 font-semibold mb-2">
              🎯 Maqsadi *
            </label>
            <textarea
              value={formData.goal}
              onChange={(e) => handleChange('goal', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
              placeholder="Nega bu vakansiya/stajga qiziqyapsiz? Maqsadlaringiz nima?"
            />
            {errors.goal && (
              <p className="text-red-400 text-sm mt-1">{errors.goal}</p>
            )}
          </motion.div>

          {errors.submit && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
            >
              <p className="text-red-400 text-center">{errors.submit}</p>
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-cyan-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 text-lg shadow-lg shadow-cyan-500/25"
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                Yuborilmoqda...
              </>
            ) : (
              <>
                <Send size={20} />
                Yuborish
              </>
            )}
          </motion.button>

          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg backdrop-blur-sm"
            >
              <p className="text-green-400 text-center font-semibold text-lg">
                ✅ Ma'lumotlaringiz yuborildi.
              </p>
              <p className="text-green-300 text-center mt-2">
                Iltimos kuting, agar mos kelsangiz biz siz bilan bog'lanamiz.
              </p>
            </motion.div>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
}
