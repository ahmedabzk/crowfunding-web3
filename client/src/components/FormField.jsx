import style from '../styles/FormField.module.css'

function FormField({labelName, placeholder,isTextArea, inputType, value, handleChange}) {
  return (
      <label className={style.labels}>
          {labelName && (
              <span className={style.spans}>{labelName}</span>
          )}
          {isTextArea ? (
              <textarea
                  required
                  value={value}
                  onChange={handleChange}
                  rows={10}
                  placeholder={placeholder}
                  className={style.text_area}
          />
          ) : (<input
                  required
                  value={value}
                  onChange={handleChange}
                  type={inputType}
                  step="0.1"
                  placeholder={placeholder}
                  className={style.input_area}
          />)}
    </label>
  )
}

export default FormField