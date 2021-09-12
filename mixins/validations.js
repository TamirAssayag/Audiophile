import { required, email } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
export default {
  mixins: [validationMixin],
  data: () => ({
    checkoutForm: {
      name: null,
      email: null,
      phone: null,
      clientAddress: null,
      clientZipCode: null,
      clientCity: null,
      clientCountry: null,
      radioGroup: null,
      eMoneyNumber: null,
      eMoneyPin: null,
    },
  }),
  validations: {
    checkoutForm: {
      name: { required },
      email: { email, required },
      phone: { required },
      clientAddress: { required },
      clientZipCode: { required },
      clientCity: { required },
      clientCountry: { required },
      radioGroup: { required },
    },
  },

  computed: {
    nameErrors() {
      const errors = []
      const $v = this.$v.checkoutForm.name
      if (!$v.$dirty) {
        return errors
      } else {
        !$v.required && errors.push("Can't be empty")
      }
      return errors
    },
    emailErrors() {
      const errors = []
      const $v = this.$v.checkoutForm.email
      if (!$v.$dirty) return errors
      !$v.email && errors.push('Must be valid e-mail')
      !$v.required && errors.push('E-mail required')
      return errors
    },
    phoneErrors() {
      const errors = []
      const $v = this.$v.checkoutForm.phone
      if (!$v.$dirty) {
        return errors
      } else {
        !$v.required && errors.push("Can't be empty")
      }
      return errors
    },
    clientAddressErrors() {
      const errors = []
      const $v = this.$v.checkoutForm.clientAddress
      if (!$v.$dirty) {
        return errors
      } else {
        !$v.required && errors.push("Can't be empty")
      }
      return errors
    },
    clientZipCodeErrors() {
      const errors = []
      const $v = this.$v.checkoutForm.clientZipCode
      if (!$v.$dirty) {
        return errors
      } else {
        !$v.required && errors.push("Can't be empty")
      }
      return errors
    },
    clientCityErrors() {
      const errors = []
      const $v = this.$v.checkoutForm.clientCity
      if (!$v.$dirty) {
        return errors
      } else {
        !$v.required && errors.push("Can't be empty")
      }
      return errors
    },
    clientCountryErrors() {
      const errors = []
      const $v = this.$v.checkoutForm.clientCountry
      if (!$v.$dirty) {
        return errors
      } else {
        !$v.required && errors.push("Can't be empty")
      }
      return errors
    },
    radioGroupErrors() {
      const errors = []
      const $v = this.$v.checkoutForm.radioGroup
      if (!$v.$dirty) {
        return errors
      } else {
        !$v.required && errors.push('Choose one method')
      }
      return errors
    },
    eMoneyNumberErrors() {
      const errors = []
      const $v = this.$v.checkoutForm.eMoneyNumber
      if (!$v.$dirty) {
        return errors
      } else {
        !$v.required && errors.push("Can't be empty")
      }
      return errors
    },
    eMoneyPinErrors() {
      const errors = []
      const $v = this.$v.checkoutForm.eMoneyPin
      if (!$v.$dirty) {
        return errors
      } else {
        !$v.required && errors.push("Can't be empty")
      }
      return errors
    },
  },
}
