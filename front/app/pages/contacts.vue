<template>
  <div style="max-width: 1280px; margin: 0 auto; padding: 2rem 1rem;">
    <!-- Заголовок страницы -->
    <div style="text-align: center; margin-bottom: 3rem;">
      <h1 style="font-size: 2rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">О компании</h1>
      <p style="color: #6b7280;">Узнайте больше о нашей деятельности и ценностях</p>
    </div>

    <!-- Блок 1: Описание компании -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-bottom: 3rem; align-items: center;">
      <div>
        <h2 style="font-size: 1.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">Кто мы</h2>
        <p style="color: #4b5563; line-height: 1.6; margin-bottom: 1rem;">
          Аляска ГазСтрой — ведущая строительная компания, специализирующаяся на газовом оборудовании и строительных услугах. Мы работаем на рынке с 2014 года и за это время зарекомендовали себя как надёжный партнёр.
        </p>
        <p style="color: #4b5563; line-height: 1.6;">
          Наша команда состоит из высококвалифицированных специалистов с многолетним опытом работы. Мы гарантируем качество, соблюдение сроков и индивидуальный подход к каждому клиенту.
        </p>
      </div>
    <div style="border-radius: 1rem; height: 300px; overflow: hidden;">
      <img :src="companyPhotoUrl" style="width: 100%; height: 100%; object-fit: cover;" alt="Фото компании">
    </div>
    </div>

    <!-- Блок 2: Наши ценности -->
    <div style="background: #f9fafb; border-radius: 1rem; padding: 2rem; margin-bottom: 3rem;">
      <h2 style="font-size: 1.5rem; font-weight: bold; text-align: center; color: #1f2937; margin-bottom: 2rem;">Наши ценности</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
        <div style="text-align: center;">
          <div style="width: 48px; height: 48px; background: #dcfce7; border-radius: 1rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
            <span style="color: #16a34a; font-size: 1.5rem;">✓</span>
          </div>
          <h3 style="font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">Качество</h3>
          <p style="color: #6b7280; font-size: 0.875rem;">Используем только сертифицированные материалы</p>
        </div>
        <div style="text-align: center;">
          <div style="width: 48px; height: 48px; background: #dcfce7; border-radius: 1rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
            <span style="color: #16a34a; font-size: 1.5rem;">✓</span>
          </div>
          <h3 style="font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">Надёжность</h3>
          <p style="color: #6b7280; font-size: 0.875rem;">Гарантия на все виды работ</p>
        </div>
        <div style="text-align: center;">
          <div style="width: 48px; height: 48px; background: #dcfce7; border-radius: 1rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
            <span style="color: #16a34a; font-size: 1.5rem;">✓</span>
          </div>
          <h3 style="font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">Сроки</h3>
          <p style="color: #6b7280; font-size: 0.875rem;">Соблюдение договорённостей</p>
        </div>
      </div>
    </div>

    <!-- Блок 3: Статистика -->
    <div style="background: #16a34a; border-radius: 1rem; padding: 2rem; color: white; margin-bottom: 3rem;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 2rem; text-align: center;">
        <div>
          <div style="font-size: 2rem; font-weight: bold;">10+</div>
          <div style="color: #dcfce7; font-size: 0.875rem;">лет на рынке</div>
        </div>
        <div>
          <div style="font-size: 2rem; font-weight: bold;">500+</div>
          <div style="color: #dcfce7; font-size: 0.875rem;">реализованных проектов</div>
        </div>
        <div>
          <div style="font-size: 2rem; font-weight: bold;">98%</div>
          <div style="color: #dcfce7; font-size: 0.875rem;">довольных клиентов</div>
        </div>
        <div>
          <div style="font-size: 2rem; font-weight: bold;">50+</div>
          <div style="color: #dcfce7; font-size: 0.875rem;">специалистов в команде</div>
        </div>
      </div>
    </div>

    <!-- Блок 4: Контакты -->
    <div style="text-align: center;">
      <h2 style="font-size: 1.5rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">Свяжитесь с нами</h2>
      <p style="color: #6b7280; margin-bottom: 1.5rem;">Оставьте заявку, и мы проконсультируем вас по всем вопросам</p>
      <NuxtLink to="/contacts">
        <button style="background: #16a34a; color: white; padding: 0.75rem 2rem; border-radius: 0.5rem; border: none; cursor: pointer; font-weight: bold;">
          Контакты
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const companyPhotoUrl = 'http://localhost:5000/uploads/Company.jpg'
</script>