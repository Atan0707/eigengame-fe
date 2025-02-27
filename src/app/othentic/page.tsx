'use client'

import { useState } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const API_BASE_URL = 'http://localhost:4003'
const VALIDATION_SERVICE_URL = 'http://localhost:4002'

interface Result {
  data?: Record<string, unknown>;
  error?: string;
}

export default function OthenticPage() {
  const [executionResult, setExecutionResult] = useState<Result | null>(null)
  const [validationResult, setValidationResult] = useState<Result | null>(null)
  const [proofOfTask, setProofOfTask] = useState('')

  const executeTask = async () => {
    const response = await axios.post(`${API_BASE_URL}/task/execute`)
    return response.data
  }

  const validateTask = async (proofOfTask: string) => {
    const response = await axios.post(`${VALIDATION_SERVICE_URL}/task/validate`, {
      proofOfTask,
    })
    return response.data
  }

  const handleExecuteTask = async () => {
    try {
      const response = await executeTask()
      console.log('Proof of Task:', JSON.stringify(response.data.proofOfTask))
      setExecutionResult(response)
      if (response && response.data.proofOfTask) {
        setProofOfTask(response.data.proofOfTask)
      }
    } catch (error: unknown) {
      console.error("Failed to execute task:", error)
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      setExecutionResult({ error: errorMessage })
    }
  }

  const handleValidateTask = async () => {
    try {
      console.log('Validating task with:', proofOfTask)
      if (!proofOfTask) {
        throw new Error('No proof of task available. Please execute a task first.')
      }
      const validationResponse = await validateTask(proofOfTask)
      console.log('Validation Result:', JSON.stringify(validationResponse.data))
      setValidationResult(validationResponse)
    } catch (error: unknown) {
      console.error("Failed to validate task:", error)
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      setValidationResult({ error: errorMessage })
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Task Executor</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Execute Task</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full"
              onClick={handleExecuteTask}
            >
              Execute Task
            </Button>

            {executionResult && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Execution Result:</h3>
                <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                  {JSON.stringify(executionResult, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Validate Task</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full"
              onClick={handleValidateTask}
              disabled={!proofOfTask}
            >
              Validate Task
            </Button>

            {validationResult && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Validation Result:</h3>
                <pre className="bg-secondary p-4 rounded-lg overflow-x-auto">
                  {JSON.stringify(validationResult, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
