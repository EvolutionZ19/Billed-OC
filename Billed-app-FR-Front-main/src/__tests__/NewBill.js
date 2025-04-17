/**
 * @jest-environment jsdom
 */

import { screen, fireEvent } from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { ROUTES_PATH } from "../constants/routes.js"
import router from "../app/Router.js"

// Mock du store (simule les méthodes sans faire de vraies requêtes)
const mockStore = {
  bills: () => ({
    update: jest.fn().mockResolvedValue({}),
    create: jest.fn().mockResolvedValue({}),
    list: jest.fn().mockResolvedValue([]), // utilisé dans onNavigate()
  }),
}

// Simulation d'un utilisateur employé dans le localStorage
const localStorageMock = {
  getItem: jest.fn(() =>
    JSON.stringify({ type: "Employee", email: "employee@test.tld" })
  ),
  setItem: jest.fn(),
  clear: jest.fn(),
}

// Injection du mock de localStorage dans la fenêtre globale
Object.defineProperty(window, "localStorage", { value: localStorageMock })

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then ...", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      //to-do write assertion
    })

    test("Then submitting the form should call updateBill", () => {
      // Simule un environnement DOM complet
      document.body.innerHTML = `<div id="root"></div>`
      router()
      window.onNavigate(ROUTES_PATH.NewBill)

      // Création d'une instance du composant avec le store mocké
      const newBill = new NewBill({
        document,
        onNavigate: window.onNavigate,
        store: mockStore,
        localStorage: window.localStorage,
      })

      // Espionne la méthode updateBill pour vérifier qu'elle est appelée
      const updateBillSpy = jest.spyOn(newBill, "updateBill")

      // Simule un fichier déjà uploadé pour éviter d’avoir à remplir le champ file
      newBill.fileUrl = "https://localhost/fake.png"
      newBill.fileName = "fake.png"

      // Envoie du formulaire
      const form = screen.getByTestId("form-new-bill")
      fireEvent.submit(form)

      // Vérifie que updateBill a été appelée
      expect(updateBillSpy).toHaveBeenCalled()
    })
  })
})

// test bloque les fichiers non image si l'utilisateur essaye de les uploader
test("Then only image files should be accepted in the justificatif field", () => {
  document.body.innerHTML = `<div id="root"></div>`
  router()
  window.onNavigate(ROUTES_PATH.NewBill)

  const mockStore = {
    bills: () => ({
      update: jest.fn().mockResolvedValue({}),
      create: jest.fn().mockResolvedValue({}),
      list: jest.fn().mockResolvedValue([]),
    }),
  }

  const newBill = new NewBill({
    document,
    onNavigate: window.onNavigate,
    store: mockStore,
    localStorage: window.localStorage,
  })

  const fileInput = screen.getByTestId("file")

  // Mock alert
  window.alert = jest.fn()

  const validFile = new File(["image"], "test.png", { type: "image/png" })
  fireEvent.change(fileInput, { target: { files: [validFile] } })

  expect(fileInput.files[0].name).toBe("test.png")
  expect(window.alert).not.toHaveBeenCalled()

  const invalidFile = new File(["document"], "test.pdf", { type: "application/pdf" })
  fireEvent.change(fileInput, { target: { files: [invalidFile] } })

  expect(fileInput.value).toBe("")
  expect(window.alert).toHaveBeenCalled()
})
