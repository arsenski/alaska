<template>
  <div>
    <!-- Герой блок -->
    <div style="background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); padding: 4rem 1rem;">
      <div style="max-width: 1280px; margin: 0 auto; text-align: center;">
        <h1 style="font-size: 3rem; font-weight: bold; color: white; margin-bottom: 1rem;">Аляска ГазСтрой</h1>
        <p style="font-size: 1.25rem; color: #dcfce7; margin-bottom: 2rem;">Профессиональное строительство и газовое оборудование с 2014 года</p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <NuxtLink to="/catalog">
            <button style="background: white; color: #16a34a; padding: 0.75rem 2rem; border-radius: 0.5rem; font-weight: 600; border: none; cursor: pointer;">
              В каталог
            </button>
          </NuxtLink>
          <NuxtLink to="/about">
            <button style="background: transparent; border: 2px solid white; color: white; padding: 0.75rem 2rem; border-radius: 0.5rem; font-weight: 600; cursor: pointer;">
              О компании
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Услуги -->
    <div style="max-width: 1280px; margin: 0 auto; padding: 4rem 1rem;">
      <h2 style="font-size: 2rem; font-weight: bold; text-align: center; color: #1f2937; margin-bottom: 3rem;">Наши услуги</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
        <div v-for="service in services" :key="service.title" style="background: white; border: 1px solid #e5e7eb; border-radius: 1rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <div style="background: #dcfce7; width: 3rem; height: 3rem; border-radius: 0.75rem; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
            <span style="color: #16a34a; font-weight: bold; font-size: 1.25rem;">{{ service.icon }}</span>
          </div>
          <h3 style="font-size: 1.25rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">{{ service.title }}</h3>
          <p style="color: #6b7280; line-height: 1.5;">{{ service.description }}</p>
        </div>
      </div>
    </div>

    <!-- Цифры -->
    <div style="background: #f3f4f6; padding: 4rem 1rem;">
      <div style="max-width: 1280px; margin: 0 auto;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; text-align: center;">
          <div>
            <div style="font-size: 2.5rem; font-weight: bold; color: #16a34a;">10+</div>
            <div style="color: #4b5563;">лет на рынке</div>
          </div>
          <div>
            <div style="font-size: 2.5rem; font-weight: bold; color: #16a34a;">500+</div>
            <div style="color: #4b5563;">проектов</div>
          </div>
          <div>
            <div style="font-size: 2.5rem; font-weight: bold; color: #16a34a;">98%</div>
            <div style="color: #4b5563;">довольных клиентов</div>
          </div>
          <div>
            <div style="font-size: 2.5rem; font-weight: bold; color: #16a34a;">50+</div>
            <div style="color: #4b5563;">специалистов</div>
          </div>
        </div>
      </div>
    </div>

<!-- О компании -->
<div style="max-width: 1280px; margin: 0 auto; padding: 4rem 1rem;">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
    <div>
      <h2 style="font-size: 2rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">О компании</h2>
      <p style="color: #4b5563; line-height: 1.6; margin-bottom: 1rem;">
        Аляска ГазСтрой — ведущая строительная компания, специализирующаяся на газовом оборудовании. Мы предоставляем полный спектр услуг по проектированию, монтажу и обслуживанию.
      </p>
      <p style="color: #4b5563; line-height: 1.6;">
        За 10 лет работы мы реализовали более 500 успешных проектов по всей России.
      </p>
    </div>
    <div style="border-radius: 1rem; height: 300px; overflow: hidden;">
      <img :src="companyPhotoUrl" style="width: 100%; height: 100%; object-fit: cover;" alt="Фото компании">
    </div>
  </div>
</div>

    <!-- Контакты -->
    <div style="background: #f3f4f6; padding: 4rem 1rem;">
      <div style="max-width: 1280px; margin: 0 auto;">
        <h2 style="font-size: 2rem; font-weight: bold; text-align: center; color: #1f2937; margin-bottom: 3rem;">Контакты</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
          <div style="background: white; border-radius: 1rem; padding: 1.5rem; text-align: center;">
            <div style="font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">Телефон</div>
            <div style="color: #16a34a;">+7 (999) 123-45-67</div>
          </div>
          <div style="background: white; border-radius: 1rem; padding: 1.5rem; text-align: center;">
            <div style="font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">Email</div>
            <div style="color: #16a34a;">info@alaska-gazstroy.ru</div>
          </div>
          <div style="background: white; border-radius: 1rem; padding: 1.5rem; text-align: center;">
            <div style="font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">Адрес</div>
            <div style="color: #16a34a;">г. Москва, ул. Строителей, 15</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const companyPhotoUrl = 'http://localhost:5000/uploads/Company.jpg'
const services = [
  { icon: '01', title: 'Монтаж газового оборудования', description: 'Установка котлов, колонок и другого газового оборудования' },
  { icon: '02', title: 'Проектирование газоснабжения', description: 'Разработка проектной документации' },
  { icon: '03', title: 'Обслуживание и ремонт', description: 'Техническое обслуживание газового оборудования' },
  { icon: '04', title: 'Строительство', description: 'Строительство домов и коммерческих объектов' },
  { icon: '05', title: 'Ремонт и отделка', description: 'Качественный ремонт помещений' },
  { icon: '06', title: 'Консультации', description: 'Бесплатные консультации специалистов' }
]
</script>