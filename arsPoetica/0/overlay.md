Свойство `globalCompositeOperation` в контексте холста (canvas context) позволяет определить, как новый слой рисунка будет визуально взаимодействовать с уже нарисованными слоями. В вашем случае, `'lighter'` используется для создания эффекта свечения, но существует несколько других режимов смешивания, которые могут создавать различные визуальные эффекты:

1. **`'source-over'`** (по умолчанию): Новый рисунок нарисован поверх старого.

2. **`'source-in'`**: Новый рисунок появляется только там, где пересекается со старым.

3. **`'source-out'`**: Новый рисунок рисуется только там, где не пересекается со старым.

4. **`'source-atop'`**: Новый рисунок рисуется поверх старого, но виден только в областях пересечения.

5. **`'destination-over'`**: Старый рисунок рисуется поверх нового.

6. **`'destination-in'`**: Старый рисунок сохраняется только там, где пересекается с новым.

7. **`'destination-out'`**: Старый рисунок сохраняется только в тех местах, где не пересекается с новым.

8. **`'destination-atop'`**: Старый рисунок рисуется поверх нового, но виден только в областях пересечения.

9. **`'lighter'`**: Цвета слоев складываются (эффект свечения).

10. **`'copy'`**: Только новый рисунок отображается, старый удаляется.

11. **`'xor'`**: Рисуется то, что не пересекается в обоих слоях.

12. **`'multiply'`**, **`'screen'`**, **`'overlay'`**, **`'darken'`**, **`'lighten'`**, **`'color-dodge'`**, **`'color-burn'`**, **`'hard-light'`**, **`'soft-light'`**, **`'difference'`**, **`'exclusion'`**, **`'hue'`**, **`'saturation'`**, **`'color'`**, **`'luminosity'`**: Эти режимы предоставляют различные способы смешивания цветов двух слоев, часто используются для создания сложных визуальных эффектов и могут быть полезны для художественных и творческих целей.

Экспериментирование с различными режимами `globalCompositeOperation` может привести к созданию уникальных и интересных визуальных эффектов на вашем холсте. Вы можете выбрать режим, который лучше всего подходит для вашего конкретного визуального стиля или концепции проекта.