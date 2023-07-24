import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { useRouter } from "next/router";
import UserForm from "./UserForm";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("UserForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render the form correctly with no user data", () => {
    useRouter.mockReturnValue({ query: {} });

    render(<UserForm />);

    const createButton = screen.getByRole("button", {
      name: "Crear nuevo usuario",
    });
    expect(createButton).toBeInTheDocument();
  });

  test("should submit the form correctly with updated user data", async () => {
    const user = {
      firstName: "John",
      lastName: "Doe",
      positionDesc: "Software Engineer",
    };
    useRouter.mockReturnValue({ query: { id: "1" } });

    axios.get.mockResolvedValue({ data: user });

    render(<UserForm />);

    await waitFor(() => {
      expect(screen.getByDisplayValue(user.firstName)).toBeInTheDocument();
      expect(screen.getByDisplayValue(user.lastName)).toBeInTheDocument();
      expect(screen.getByDisplayValue(user.positionDesc)).toBeInTheDocument();
    });

    const firstNameInput = screen.getByLabelText("Nombre:");
    const lastNameInput = screen.getByLabelText("Apellido:");
    const positionDescInput = screen.getByLabelText("Descripción del cargo:");
    fireEvent.change(firstNameInput, { target: { value: "Jane" } });
    fireEvent.change(lastNameInput, { target: { value: "Smith" } });
    fireEvent.change(positionDescInput, {
      target: { value: "Frontend Developer" },
    });

    axios.put.mockResolvedValue({ data: {} });

    const submitButton = screen.getByRole("button", {
      name: "Actualizar usuario",
    });
    fireEvent.click(submitButton);

    await waitFor(() => expect(axios.put).toHaveBeenCalled());
    expect(axios.put).toHaveBeenCalledWith("/api/users/1", {
      firstName: "Jane",
      lastName: "Smith",
      positionDesc: "Frontend Developer",
    });
  });
});
